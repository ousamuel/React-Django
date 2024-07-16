"use client";
import React, { Component } from "react";
import axios from "axios";
import { Image } from "@nextui-org/react";

export default class ProjectList extends Component {
  state = {
    projects: [],
  };

  componentDidMount() {
    this.fetchProjects();
  }
  fetchProjects = () => {
    axios.get(`http://localhost:8000/api/projects/`).then((res) => {
      const projects = res.data;
      console.log(res.data);
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
      .delete(`http://localhost:8000/api/projects/${id}/`)
      .then((res) => this.fetchProjects());
  };
  render() {
    return (
      <div className="projects-container">
        {this.state.projects.map((project) => (
          <div className="project-box" key={project.id}>
            <a
              className="text-blue-500 underline hover:text-blue-300"
              href={project.link}
              target="_blank"
            >
              <h3>{project.title}</h3>
            </a>
            <Image
              alt="image1"
              className="project-images"
              src={project.image ? project.image : `/imgs/background2.jpg`}
            />
            <div>
              <button
                onClick={() => {
                  this.handleDelete(project.id);
                }}
                className="text-[10px] text-white bg-red-500 w-fit float-right px-2 py-1 rounded-lg mt-2 hover:bg-red-300"
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
