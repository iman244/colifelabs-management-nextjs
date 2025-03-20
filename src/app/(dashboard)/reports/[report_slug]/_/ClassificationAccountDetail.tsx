import React, { FC } from "react";
import { Classification, FinancialStatement } from "../type";
import {
  account_value_for_period,
  accounting_display,
  accounting_mt_display,
  classification_value_period,
  gperiods,
} from "./utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { BarChart, BarSeriesType } from "@mui/x-charts";
import { DatasetType, MakeOptional } from "@mui/x-charts/internals";

const ClassificationAccountDetail: FC<{
  selected_classification: Classification;
  data: FinancialStatement;
}> = ({ data, selected_classification }) => {
  const periods = gperiods(1404);

  const childs = data.classifications.filter(
    (c) => c.parent == selected_classification.id
  );

  const dataset: DatasetType = periods.map((period) => {
    const d: {
      [key: string]: number | string;
    } = {};
    childs.forEach((c) => {
      d[`${c.name}`] = classification_value_period(
        c.id,
        data.classifications,
        period
      );
    });
    selected_classification.accounts.forEach((acc) => {
      d[`${acc.name}`] = account_value_for_period(acc, period);
    });
    d["period"] = period;
    return d;
  });

  const series: MakeOptional<BarSeriesType, "type">[] = Object.entries(
    dataset[0]
  )
    .filter(([k]) => k != "period")
    .map(([k]) => ({
      dataKey: k,
      label: k,
      stack: 'a',
      valueFormatter: accounting_display,
    }));
  console.log("ClassificationAccountDetail series", series);

  return (
    <BarChart
      dataset={dataset}
      height={300}
      margin={{
        left: 80,
      }}
      sx={{
        marginTop: "40px",
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
  );
};

export default ClassificationAccountDetail;
