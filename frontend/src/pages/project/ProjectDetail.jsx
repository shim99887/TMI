import React from "react";
import { useParams } from "react-router";

export default function ProjectDetail() {
  const path = useParams();
  return (
    <div>
      ProjectDetail
      {path.id} project
    </div>
  );
}
