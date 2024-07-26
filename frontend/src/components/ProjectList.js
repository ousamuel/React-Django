"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Image } from "@nextui-org/react";
import { AuthContext } from "@/app/AuthContext";

const ProjectList = ({ refreshProjects }) => {
  const [projects, setProjects] = useState([]);
  const { DB_HOST } = useContext(AuthContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [refreshProjects]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${DB_HOST}/projects/`);
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${DB_HOST}/projects/${id}/`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <div className="project-box" key={project.id}>
          <div className="ml-5 hidden sm:float-right sm:block ">
            <a
              className="text-blue-500 underline hover:text-blue-300"
              href={`/projects/${project.id}`}
            >
              <Image
                alt={project.title + project.id}
                className="project-images"
                src={project.image ? project.image : `/imgs/github.jpg`}
              />
            </a>
            <button
              onClick={() => handleDelete(project.id)}
              className="text-[10px] text-white bg-red-500 w-fit px-2 py-1 rounded-lg mt-2 hover:bg-red-300"
            >
              Delete
            </button>
          </div>
          <h3 className="flex-wrap">
            <a
              className="text-blue-500 underline hover:text-blue-300"
              href={project.link}
              target="_blank"
            >
              {project.title}
            </a>{" "}
            <span className="text-gray-500 text-sm"> by {project.creator}</span>
          </h3>
          <p>{project.description}</p>
          <div className="ml-5 sm:hidden">
            <a
              className="text-blue-500 underline hover:text-blue-300"
              href={`/projects/${project.id}`}
            >
              <Image
                alt={project.title + project.id}
                className="project-images"
                src={project.image ? project.image : `/imgs/github.jpg`}
              />
            </a>
            <button
              onClick={() => handleDelete(project.id)}
              className="text-[10px] text-white bg-red-500 w-fit px-2 py-1 rounded-lg mt-2 hover:bg-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
