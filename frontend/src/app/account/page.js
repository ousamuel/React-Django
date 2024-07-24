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
import { set, useForm } from "react-hook-form";
import { AuthContext } from "../AuthContext";
import React, { useContext } from "react";
import axios from "axios";
export default function Account() {
  const { profile, DB_HOST, router } = useContext(AuthContext);
  const {
    register: register,
    handleSubmit: handleLoginSubmit,
    reset: reset,
    formState: { errors: errors },
  } = useForm();

  const onLoginSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${DB_HOST}/token/`,
        {
          username: data.username,
          password: data.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful");
        router.push('/')
      }
    } catch (error) {
      // console.log(error.response.data);
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form className="form-box" onSubmit={handleLoginSubmit(onLoginSubmit)}>
        <input
          maxLength={15}
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>Username is required</span>}
        <input
          // type="password"
          placeholder="Password"
          // onChange={() => setDupLinkedIn(false)}
          {...register("password", { required: true })}
        />
        {errors.password && <span>password is required</span>}
        {/* {dupLinkedIn && !errorsUser.linkedin && (
          <span>This LinkedIn URL has already been used</span>
        )} */}
        <input type="submit" />
      </form>
    </div>
  );
}
