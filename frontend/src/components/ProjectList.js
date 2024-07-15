"use client";
import React, { Component } from "react";
import axios from "axios";
import { Image } from "@nextui-org/react";

export default class ProjectList extends Component {
  state = {
    projects: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:8000/api/projects/`).then((res) => {
      const projects = res.data;
      console.log(res.data);
      this.setState({ projects });
    });
  }
  handleDelete = (item) => {
    axios.delete(`/api/todos/${item.id}/`).then((res) => this.refreshList());
  };
  render() {
    return (
      <div className="projects-container">
        {this.state.projects.map((project) => (
          <div className="project-box" key={project.id}>
            <Image
              alt="image1"
              className="project-images"
              src={project.image ? project.image : `/imgs/background2.jpg`}
            />
            <h3>{project.title}</h3>
          </div>
        ))}
      </div>
    );
  }
}
