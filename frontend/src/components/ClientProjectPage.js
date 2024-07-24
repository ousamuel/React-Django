"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const DB_HOST = process.env.NEXT_PUBLIC_DB;

export default function Project({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [badURL, setBadURL] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${DB_HOST}/projects/${projectId}`);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setBadURL(true);
        setTimeout(() => {
          router.push('/projects'); // Redirect to projects list or another appropriate page
        }, 3000); // Redirect after 3 seconds
      }
    };

    fetchProject();
  }, [projectId, router]);

  if (badURL) {
    return <div>This URL does not exist, redirecting you in 3 seconds</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="projects-container">
      <div>{project.title}</div>
      <div>{project.description}</div>
      <div>
        <a href={project.link}>{project.link}</a>
      </div>
      {/* <div>{project.user.username}</div> */}
      {/* Add more project details here */}
    </div>
  );
};
