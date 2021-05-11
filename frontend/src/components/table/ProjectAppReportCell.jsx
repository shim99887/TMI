import { Box, TableCell } from "@material-ui/core";
import datetime from "../../utils/moment";
import React from "react";

export default function ProjectAppReportCell({ row }) {
  const totalLineCovSum = row.totalLineCovCovered + row.totalLineCovMissed;
  const totalBranchCovSum =
    row.totalBranchCovCovered + row.totalBranchCovMissed;
  const totalTestCount =
    row.totalErrorCount +
    row.totalFailCount +
    row.totalRunCount +
    row.totalSkipCount;
  return (
    <>
      <TableCell>{datetime(row.datetime)}</TableCell>
      <TableCell>
        <Box>
          {totalLineCovSum
            ? Math.round((row.totalLineCovMissed / totalLineCovSum) * 10000) /
              100
            : 100}
        </Box>
        <Box>Covered / Missed</Box>
        <Box>
          {row.totalLineCovCovered} / {row.totalLineCovMissed}
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          {totalBranchCovSum
            ? Math.round(
                (row.totalBranchCovMissed / totalBranchCovSum) * 10000
              ) / 100
            : 100}
        </Box>
        <Box>Covered / Missed</Box>
        <Box>
          {row.totalBranchCovCovered} / {row.totalBranchCovMissed}
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          {totalTestCount
            ? Math.round((row.totalRunCount / totalTestCount) * 10000) / 100
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
