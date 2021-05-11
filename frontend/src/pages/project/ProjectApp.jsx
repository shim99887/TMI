import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectReportGraphs from "../../components/project/ProjectReportGraphs";
import { appAxios } from "../../utils/axios";
import CommonTable from "../../components/table/CommonTable";
import ProjectAppTableBody from "../../components/table/ProjectAppTableBody";

export default function ProjectApp() {
  const params = useParams();
  const [appList, setAppList] = useState([]);

  // dummy test
  const test = [
    { id: 1, title: "test1" },
    { id: 2, title: "test2" },
  ];

  useEffect(async () => {
    try {
      const responseData = await appAxios.getAppByProjectId(params.id);
      setAppList(responseData);
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
        <ProjectReportGraphs appList={appList} />
      </div>
      <div>
        <h2>App List</h2>
        <CommonTable
          head={[
            "App Name",
            "Build Datetime",
            "Line Cov.(%)",
            "Branch Cov.(%)",
            "Pass Rate(%)",
            "Elapsed Time(sec.)",
          ]}
          body={appList.map((app, index) => (
            <ProjectAppTableBody key={index} app={app} />
          ))}
        />
      </div>
    </>
  );
}
