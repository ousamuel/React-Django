"use client";
import ClientProfilePage from "@/components/ClientProfilePage";
import axios from "axios";
// export async function generateStaticParams() {
//   const DB_HOST = process.env.NEXT_PUBLIC_DB_127;

//   try {
//     const profiles = await axios.get(`${DB_HOST}/profiles/`);
//     return profiles.data.map((profile) => ({
//       id: profile.id.toString(), // Ensure the ID is a string
//     }));
//   } catch (error) {
//     console.error('Error fetching profiles:', error);
//     return [];
//   }
// }

// export default function ProfilePage({ params }) {
//   const { id } = params;
//   return <ClientProfilePage profileId={id} />;
// }
import React, { useState, useEffect, useContext } from "react";
import { Image } from "@nextui-org/react";
import { AuthContext } from "@/app/AuthContext";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Loader from "@/components/Loader";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [badURL, setBadURL] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();
  const { DB_HOST } = useContext(AuthContext);
  const { id } = useParams();
  const fetchProfile = async () => {
    // console.log(profileId);
    try {
      const response = await axios.get(`${DB_HOST}/profiles/${profileId}`);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setBadURL(true); // Set badURL to true if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [profileId]);

  if (badURL) {
    setTimeout(() => {
      router.push("/"); // Redirect to the homepage or another page after 3 seconds
    }, 3000);
    return <div>This URL does not exist, redirecting you in 3 seconds</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main flex justify-center">
      <div className="main-body">
        <section>left bio</section>

        <section>
          <h2>{profileData.first_name}</h2>
          <Image src="/imgs/avatar.png" alt="default-pfp" />
        </section>
        <section>right section</section>
      </div>
      {/* <div>{user.name}</div> */}
    </div>
  );
};
export default ProfilePage;
