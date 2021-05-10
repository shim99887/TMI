import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectReportGraphs from "../../components/project/ProjectReportGraphs";
import ProjectReportCoverageList from "../../components/project/ProjectReportCoverageList";
import { ReportAxios } from "../../utils/axios";

export default function ProjectReport() {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(async () => {
    const reportAxios = new ReportAxios();
    try {
      const responseData = await reportAxios.all();
      setData(responseData);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    return () => {};
  }, []);
  return (
    <>
      <h2>{params.id} PJT</h2>
      <div>
        <ProjectReportGraphs data={data} />
      </div>
      <div>
        <h2>Test Job List</h2>
        <ProjectReportCoverageList data={data} />
      </div>
    </>
  );
}
