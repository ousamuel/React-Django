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

const ProjectsLanding = () => {
  // Separate useForm hooks for each form
  return <main className="text-center">Projects page</main>;
};

export default ProjectsLanding;
