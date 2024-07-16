"use client";
import { Image } from "@nextui-org/react";
import { set, useForm } from "react-hook-form";
import ProjectList from "@/components/ProjectList";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  let DB_HOST = process.env.NEXT_PUBLIC_DB;
  // console.log(DB_HOST);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState(null);
  const [refreshProjects, setRefreshProjects] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    axios
      .post(`${DB_HOST}/projects/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // handles potential file(image) uploads instead of just regular application/json
        },
      })
      .then(function (response) {
        setRefreshProjects(!refreshProjects);
        // setNewPost({ title: response.title, image: response.image, description:response.description, link:response.link });
        console.log(response);
        reset();
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status == 400) {
          setDupLink(true);
        }
      });
  };
  const [dupLink, setDupLink] = useState(false);
  return (
    <main className="text-center ">
      {/* <nav>top</nav> */}
      <h1>Dev Depot</h1>
      <div id="submission">Sign in to add your own work</div>
      <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className={errors.title ? "border-red-500" : ""}
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>Title is required</span>}
        {/*  */}
        <input placeholder="Description" {...register("description")} />
        {/*  */}
        <input
          type="url"
          placeholder="Link"
          onChange={() => setDupLink(false)}
          {...register("link", { required: true })}
        />
        {errors.link && <span>Link is required</span>}
        {dupLink && !errors.link && (
          <span>This link has already been used</span>
        )}
        {/*  */}
        <input
          type="file"
          className="items-center"
          accept="image/png, image/jpeg, image/jpg"
          // specifying file type
          {...register("image")}
        />
        {/*  */}
        <input type="submit" />
      </form>
      {/* {loading? :} */}
      <ProjectList refreshProjects={refreshProjects} />
    </main>
  );
}
