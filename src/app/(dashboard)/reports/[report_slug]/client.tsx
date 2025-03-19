"use client";

import { BarChart, BarSeriesType } from "@mui/x-charts";
import React, { FC, useEffect, useState } from "react";
import { FinancialStatement } from "./type";
import {
  accounting_display,
  accounting_mt_display,
  classifications_value_period,
  gperiods,
} from "./utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Container } from "@mui/material";
import { DatasetType, MakeOptional } from "@mui/x-charts/internals";

const ReportClientPage: FC<{
  data: FinancialStatement;
}> = ({ data }) => {
  const [dataset, setDataset] = useState<DatasetType>([])
  const [series, setSeries] = useState<MakeOptional<BarSeriesType, "type">[]>([])

  useEffect(()=>{
    const year = 1404;
    const periods = gperiods(year);
  
    const root = data.classifications.find((c) => c.level == 0);
  
  
    console.log("root", root);
    console.log("data.classifications", data.classifications);
  
    // const root_cal = periods.map((period) => {
    //   return classifications_value_period(root.id, data.classifications, period);
    // });
  
  
    const _dataset: DatasetType = periods.map((period) => {
      const d: {
        [key: string]: number | string;
      } = {
        period,
      };
  
      data.classifications.forEach((c) => {
        d[`${c.name}`] = classifications_value_period(
          c.id,
          data.classifications,
          period
        );
      });
  
      return d;
    });
  
  
    console.log("dataset", _dataset);
    setDataset(_dataset)
    setSeries([
      {
        
        dataKey: root?.name || "",
        label: root?.name || "",
        valueFormatter: accounting_display,
      },
    ])
  
  },[])
 
  return (
    <Container
      sx={{
        width: "100%",
        height: "400px",
      }}
    >
      <BarChart
        dataset={dataset}
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
            dataKey: "period",
            valueFormatter: digitsEnToFa,
            label: "دوره",
          },
        ]}
        series={series}
      />
    </Container>
  );
};

export default ReportClientPage;
