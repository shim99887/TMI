import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectDetailGraphs from "../../components/project/ProjectDetailGraphs";
import ProjectDetailTestJobList from "../../components/project/ProjectDetailTestJobList";
import { ProjectAxios } from "../../utils/axios";

export default function ProjectDetail() {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(async () => {
    const projectAxios = new ProjectAxios();
    try {
      const responseData = await projectAxios.one(params.id);
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, []);
  return (
    <>
      <p>axios data: {JSON.stringify(data)}</p>
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
