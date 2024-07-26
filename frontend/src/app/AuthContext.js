"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  let DB_HOST = process.env.NEXT_PUBLIC_DB;
  const fetchProfile = async () => {
    console.log(DB_HOST)
    try {
      const response = await axios.get(`${DB_HOST}/profile1/`, {
        withCredentials: true, // This ensures cookies are included in the request
      });

      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ router, profile, setProfile, loading, DB_HOST }}>
      {children}
    </AuthContext.Provider>
  );
};

// FIGURE OUT:
// what endpoints to protect,
// profile data and how to secure that only a user can edit their own profile
