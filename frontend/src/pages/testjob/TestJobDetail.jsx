import React from "react";
import { useParams } from "react-router";
import TestJobItemContainer from "../../components/TestJobDetail/TestJobItemContainer";

export default function TestJobDetail() {
  // const path = useParams();

  // axios.get() Project의 TestJobList 반환받는다

  return (
    <div>
      <div
        style={{
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <TestJobItemContainer
          name="DashBoardDataComponent should run #getCoverageTotal()"
          time="143"
          color="10px solid #00FF00"
          secondColor="8px solid #00DD00"
          resultType="Success"
          errorType="none of content"
          errorMessage="none of content"
          errorContents="none of content"
        />
      </div>

      <div
        style={{
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <TestJobItemContainer
          name="DashBoardDataComponent should run #getCoverageTotal()"
          time="143"
          color="10px solid #FFAA00"
          secondColor="8px solid #FFCC66"
          resultType="Fail"
          errorType="none of content"
          errorMessage="none of content"
          errorContents="none of content"
        />
      </div>

      <div
        style={{
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <TestJobItemContainer
          name="DashBoardDataComponent should run #getCoverageTotal()"
          time="143"
          color="10px solid #FF0000"
          secondColor="8px solid #FF4444"
          resultType="Error"
          errorType="none of content"
          errorMessage="none of content"
          errorContents="none of content"
        />
      </div>

      <div
        style={{
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <TestJobItemContainer
          name="DashBoardDataComponent should run #getCoverageTotal()"
          time="143"
          color="10px solid #AAAAAA"
          secondColor="8px solid #CCCCCC"
          resultType="Skip"
          errorType="none of content"
          errorMessage="none of content"
          errorContents="none of content"
        />
      </div>
    </div>
  );
}
