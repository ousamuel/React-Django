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
  const [dupLink, setDupLink] = useState(false);
  const [charCount, setCharCount] = useState(0);
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
    formData.append("creator", data.creator);
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
  return (
    <main className="text-center ">
      {/* <nav>top</nav> */}
      <h1>Dev Depot2</h1>
      {/* <div id="submission">Sign in to add your own work</div> */}
      <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className={errors.title ? "border-red-500" : ""}
          maxLength={15}
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <input
          className={errors.creator ? "border-red-500" : ""}
          maxLength={15}
          placeholder="Creator"
          {...register("creator", { required: true })}
        />
        {errors.creator && <span>Name is required</span>}
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
        <div className="flex flex-wrap max-w-[350px] justify-center">
          Upload an image (optional):
          <input
            type="file"
            className="w-fit"
            accept="image/png, image/jpeg, image/jpg"
            // specifying file type
            {...register("image")}
          />
        </div>
        {/*  */}
        <textarea
          className="w-3/4 max-w-[350px] py-1 px-2 border"
          placeholder="Add description. Max: 250 characters"
          maxLength={250}
          onKeyUp={(e) => {
            setCharCount(e.target.value.length);
            console.log(e.target.value.length);
          }}
          {...register("description", { required: true })}
        />
        <p className={charCount == 250 ? "text-red-500" : ""}>
          {errors.description && (
            <span className="mr-2">Description is required</span>
          )}
          {charCount} / 250
        </p>

        {/*  */}
        <input type="submit" />
      </form>
      {/* {loading? :} */}
      <ProjectList refreshProjects={refreshProjects} />
    </main>
  );
}
