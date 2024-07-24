"use client";
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
  const { profileId } = useParams();
  const router = useRouter();
  const { profile, DB_HOST } = useContext(AuthContext);
  const fetchProfile = async () => {
    console.log(profileId);
    try {
      const response = await axios.get(`${DB_HOST}/profiles/${profileId}`, {
        // withCredentials: true, // This ensures cookies are included in the request
      });

      setProfileData(response.data);
      // console.log(response.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  // if (badURL) {
  //   return <div>This URL does not exist, redirecting you in 3 seconds</div>;
  // }

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
};

export default ProfilePage;
