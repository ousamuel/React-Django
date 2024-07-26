"use client";
import {
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import ProjectList from "@/components/ProjectList";
import AllUsers from "@/components/AllUsers";
import NavBar from "@/components/Navbar";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [dupLink, setDupLink] = useState(false);
  const [dupLinkedIn, setDupLinkedIn] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const {DB_HOST} = useContext(AuthContext)
  // Separate useForm hooks for each form
  const {
    register: registerProject,
    handleSubmit: handleSubmitProject,
    watch: watchProject,
    reset: resetProject,
    formState: { errors: errorsProject },
  } = useForm();

  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    watch: watchUser,
    reset: resetUser,
    formState: { errors: errorsUser },
  } = useForm();

  const onPostSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("creator", data.creator);
    formData.append("description", data.description);
    formData.append("link", data.link);
    // if (data.image[0]) {
    //   formData.append("image", data.image[0]);
    // }

    axios
      .post(`${DB_HOST}/projects/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setRefreshProjects(!refreshProjects);
        resetProject();
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          setDupLink(true);
        }
      });
  };

  const onUserSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("linkedin", data.linkedin);

    axios
      .post(`${DB_HOST}/users/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        setRefreshUsers(!refreshUsers);
        resetUser();
      })
      .catch(function (error) {
        // console.log(error);
        if (error.response.status == 400) {
          setDupLinkedIn(true);
        }
      });
  };
  return (
    <main className="text-center">
      
      <NavBar />
      <h1>Dev Showcase</h1>
      <form className="form-box" onSubmit={handleSubmitProject(onPostSubmit)}>
        <input
          className={errorsProject.title ? "border-red-500" : ""}
          maxLength={15}
          placeholder="Title"
          {...registerProject("title", { required: true })}
        />
        {errorsProject.title && <span>Title is required</span>}
        <input
          className={errorsProject.creator ? "border-red-500" : ""}
          maxLength={15}
          placeholder="Creator"
          {...registerProject("creator", { required: true })}
        />
        {errorsProject.creator && <span>Name is required</span>}
        <input
          type="url"
          placeholder="Link"
          onChange={() => setDupLink(false)}
          {...registerProject("link", { required: true })}
        />
        {errorsProject.link && <span>Link is required</span>}
        {dupLink && !errorsProject.link && (
          <span>This link has already been used</span>
        )}
        <textarea
          className="w-3/4 max-w-[350px] py-1 px-2 border"
          placeholder="Add description. Max: 250 characters"
          maxLength={250}
          onKeyUp={(e) => setCharCount(e.target.value.length)}
          {...registerProject("description", { required: true })}
        />
        <p className={charCount == 250 ? "text-red-500" : ""}>
          {errorsProject.description && (
            <span className="mr-2">Description is required</span>
          )}
          {charCount} / 250
        </p>
        <input type="submit" />
      </form>

      <ProjectList refreshProjects={refreshProjects} />

      <form className="form-box" onSubmit={handleSubmitUser(onUserSubmit)}>
        <input
          className={errorsUser.name ? "border-red-500" : ""}
          maxLength={15}
          placeholder="Name"
          {...registerUser("name", { required: true })}
        />
        {errorsUser.name && <span>Name is required</span>}
        <input
          type="url"
          placeholder="LinkedIn"
          onChange={() => setDupLinkedIn(false)}
          {...registerUser("linkedin", { required: true })}
        />
        {errorsUser.linkedin && <span>LinkedIn is required</span>}
        {dupLinkedIn && !errorsUser.linkedin && (
          <span>This LinkedIn URL has already been used</span>
        )}
        <input type="submit" />
      </form>

      <AllUsers refreshUsers={refreshUsers} />
    </main>
  );
}
