"use client";
import React, { Component, useEffect } from "react";
import axios from "axios";
import { Image } from "@nextui-org/react";

let DB_HOST = process.env.NEXT_PUBLIC_DB;

export default class ProjectList extends Component {
  state = {
    projects: [],
  };

  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = () => {
    // console.log(DB_HOST);
    axios.get(`${DB_HOST}/projects/`).then((res) => {
      const projects = res.data;
      // console.log(res.data);
      this.setState({ projects });
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.refreshProjects !== this.props.refreshProjects) {
      this.fetchProjects();
    }
  }

  handleDelete = (id) => {
    axios
      .delete(`${DB_HOST}/projects/${id}/`)
      .then((res) => this.fetchProjects());
  };
  render() {
    return (
      <div className="projects-container">
        {this.state.projects.map((project) => (
          <div className="project-box" key={project.id}>
            <div className="ml-5 hidden sm:float-right sm:block ">
              <a
                className=" text-blue-500 underline hover:text-blue-300"
                href={`/projects/${project.id}`}
                // target="_blank"
              >
                <Image
                  alt={project.title + project.id}
                  className="project-images"
                  src={project.image ? project.image : `/imgs/github.jpg`}
                />
              </a>
              <button
                onClick={() => {
                  this.handleDelete(project.id);
                }}
                className="text-[10px] text-white bg-red-500 w-fit px-2 py-1 rounded-lg mt-2 hover:bg-red-300"
              >
                Delete
              </button>
            </div>
            <h3 className="flex-wrap">
              <a
                className=" text-blue-500 underline hover:text-blue-300"
                href={project.link}
                target="_blank"
              >
                {project.title}
              </a>{" "}
              <span className="text-gray-500 text-sm">
                {" "}
                by {project.creator}
              </span>
            </h3>
            <p>{project.description}</p>
            <div className="ml-5 sm:hidden">
              <a
                className=" text-blue-500 underline hover:text-blue-300"
                href={`/projects/${project.id}`}
                // target="_blank"
              >
                <Image
                  alt={project.title + project.id}
                  className="project-images"
                  src={project.image ? project.image : `/imgs/github.jpg`}
                />
              </a>
              <button
                onClick={() => {
                  this.handleDelete(project.id);
                }}
                className="text-[10px] text-white bg-red-500 w-fit px-2 py-1 rounded-lg mt-2 hover:bg-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
