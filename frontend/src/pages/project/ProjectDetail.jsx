import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectDetailGraphs from "../../components/project/ProjectDetailGraphs";
import ProjectDetailTestJobList from "../../components/project/ProjectDetailTestJobList";
import { JacocoAxios } from "../../utils/axios";

export default function ProjectDetail() {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(async () => {
    const jacocoAxios = new JacocoAxios();
    try {
      const responseData = await jacocoAxios.all();
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, []);
  return (
    <>
      <h2>{params.id} PJT</h2>
      <div>
        <ProjectDetailGraphs data={data} />
      </div>
      <div>
        <h2>Test Job List</h2>
        <ProjectDetailTestJobList data={data} />
      </div>
    </>
  );
}
