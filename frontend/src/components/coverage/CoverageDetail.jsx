import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import datetime from "../../utils/moment";
import { Box, colors } from "@material-ui/core";

// totalBranchCovCovered: 40
// totalBranchCovMissed: 60
// totalElapsedTime: 1800
// totalErrorCount: 2
// totalFailCount: 1
// totalLineCovCovered: 100
// totalLineCovMissed: 60
// totalRunCount: 20
// totalSkipCount: 2

const columns = [
  {
    field: "datetime",
    headerName: "Build Datetime",
    flex: 1,

    // valueGetter: (params) => params,
  },
  {
    field: "lineCov",
    headerName: "Line Cov.(%)",
    description: "Line Coverage (Covered / Missed)",
    flex: 1,
    valueGetter: (params) => {
      const covered = params.getValue("totalLineCovCovered");
      const missed = params.getValue("totalLineCovMissed");
      const total = covered + missed;

      if (total) {
        return Math.round((covered / total) * 10000) / 100;
      }
      return 100;
    },
  },
  { field: "totalLineCovCovered", headerName: "Line Coverd", flex: 1 },
  { field: "totalLineCovMissed", headerName: "Line Missed", flex: 1 },
  {
    field: "branchCov",
    headerName: "Branch Cov.(%)",
    flex: 1,
    valueGetter: (params) => {
      const covered = params.getValue("totalBranchCovCovered");
      const missed = params.getValue("totalBranchCovMissed");
      const total = covered + missed;

      if (total) {
        return Math.round((covered / total) * 10000) / 100;
      }
      return 100;
    },
  },
  {
    field: "totalBranchCovCovered",
    headerName: "Branch Covered",
    flex: 1,
  },
  {
    field: "totalBranchCovMissed",
    headerName: "Branch Missed",
    flex: 1,
  },
];

export default function CoverageDetail({ data }) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid rows={data} columns={columns} autoPageSize />
    </div>
  );
}
