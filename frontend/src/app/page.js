"use client";
import { Image } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import ProjectList from "@/components/ProjectList";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  // let supported_image_types = ["jpg", "png", "jpeg"];
  let DB_HOST = process.env.NEXT_PUBLIC_DB;
  // console.log(DB_HOST);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
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
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          className={errors.link ? "border-red-500" : ""}
          type="url"
          placeholder="Link"
          {...register("link", { required: true })}
        />
        {errors.link && <span>Link is required</span>}
        {/*  */}
        <input
          type="file"
          className="items-center"
          accept="image/png, image/jpeg, image/jpg"
          {...register("image")}
        />
        {}
        {/*  */}
        <input type="submit" />
      </form>
      {/* {loading? :} */}
      <ProjectList />
    </main>
  );
}
