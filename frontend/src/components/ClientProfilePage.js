"use client";
import React, { useState, useEffect, useContext } from "react";
import { Image } from "@nextui-org/react";
import { AuthContext } from "@/app/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function ClientProfilePage({ profileId }) {
  const [loading, setLoading] = useState(true);
  const [badURL, setBadURL] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();
  const { DB_HOST } = useContext(AuthContext);

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
          <Image src='/imgs/avatar.png' alt='default-pfp'/>
        </section>
        <section>right section</section>
      </div>
      {/* <div>{user.name}</div> */}
    </div>
  );
}
