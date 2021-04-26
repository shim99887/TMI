import React from "react";
import { useParams } from "react-router";

export default function TestJobDetail() {
  const path = useParams();
  return (
    <div>
      TestJobDetail
      {path.id} test
    </div>
  );
}
