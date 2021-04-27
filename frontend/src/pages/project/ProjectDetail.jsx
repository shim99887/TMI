import React from "react";
import { useParams } from "react-router";
import ProjectDetailGraphs from "../../components/project/ProjectDetailGraphs";
import ProjectDetailTestJobList from "../../components/project/ProjectDetailTestJobList";

export default function ProjectDetail() {
  const params = useParams();
  return (
    <>
      <h2>{params.id} PJT</h2>
      <div>
        <ProjectDetailGraphs />
      </div>
      <div>
        <h2>Test Job List</h2>
        <ProjectDetailTestJobList />
      </div>
    </>
  );
}
