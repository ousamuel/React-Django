"use client";
import { Image } from "@nextui-org/react";
import ProjectList from "@/components/ProjectList";
import React, { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <nav>top</nav>
      <h1>Title</h1>
      <div id="submission">add new post</div>
      {/* {loading? :} */}
      <ProjectList />
    </main>
  );
}
