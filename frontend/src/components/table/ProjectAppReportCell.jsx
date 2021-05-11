import { Box, TableCell } from "@material-ui/core";
import datetime from "../../utils/moment";
import React from "react";

export default function ProjectAppReportCell({ row }) {
  return (
    <>
      <TableCell>{datetime(row.datetime)}</TableCell>
      <TableCell>
        <Box>
          {row.totalLineCovCovered + row.totalLineCovMissed
            ? row.totalLineCovMissed /
              (row.totalLineCovCovered + row.totalLineCovMissed)
            : 100}
        </Box>
        <Box>Covered / Missed</Box>
        <Box>
          {row.totalLineCovCovered} / {row.totalLineCovMissed}
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          {row.totalBranchCovCovered + row.totalBranchCovMissed
            ? row.totalBranchCovMissed /
              (row.totalBranchCovCovered + row.totalBranchCovMissed)
            : 100}
        </Box>
        <Box>Covered / Missed</Box>
        <Box>
          {row.totalBranchCovCovered} / {row.totalBranchCovMissed}
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          {row.totalErrorCount +
          row.totalFailCount +
          row.totalRunCount +
          row.totalSkipCount
            ? row.totalRunCount /
              (row.totalErrorCount +
                row.totalFailCount +
                row.totalRunCount +
                row.totalSkipCount)
            : 100}
        </Box>
        <Box>Run / Fail / Skip / Error</Box>
        <Box>
          {row.totalRunCount} / {row.totalFailCount} / {row.totalSkipCount} /{" "}
          {row.totalErrorCount}
        </Box>
      </TableCell>
      <TableCell>{row.totalElapsedTime}</TableCell>
    </>
  );
}
