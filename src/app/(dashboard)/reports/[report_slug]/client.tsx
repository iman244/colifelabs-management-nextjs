"use client";

import { BarChart } from "@mui/x-charts";
import React, { FC } from "react";
import { FinancialStatement } from "./type";
import {
  accounting_display,
  accounting_mt_display,
  classifications_value_period,
  gperiods,
} from "./utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Container } from "@mui/material";

const ReportClientPage: FC<{
  data: FinancialStatement;
}> = ({ data }) => {
  const year = 1404;
  const periods = gperiods(year);

  const root = data.classifications.find((c) => c.level == 0);

  if (!root) {
    return <>root undefined</>;
  }

  console.log("root", root);
  console.log("data.classifications", data.classifications);

  const root_cal = periods.map((period) => {
    return classifications_value_period(root.id, data.classifications, period);
  });

  console.log("root_cal", root_cal);

  return (
    <Container
      sx={{
        width: "100%",
        height: "400px",
      }}
    >
      <BarChart
        margin={{
          left: 80,
        }}
        sx={{
          ".MuiChartsAxis-directionY .MuiChartsAxis-label": {
            transform: "translate(20px)", // Add left margin
          },
        }}
        yAxis={[
          {
            label: "میلیون تومان",
            valueFormatter: accounting_mt_display,
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            data: periods,
            valueFormatter: digitsEnToFa,
            label: "دوره",
          },
        ]}
        series={[
          {
            data: root_cal,
            label: root.name,
            valueFormatter: accounting_display,
          },
        ]}
      />
    </Container>
  );
};

export default ReportClientPage;
