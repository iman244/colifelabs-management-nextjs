import React, { FC, useRef } from "react";
import { Account } from "../type";
import {
  accounting_display,
  accounting_mt_display,
  gperiods,
  transaction_value_for_period,
} from "./utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { BarChart, BarSeriesType } from "@mui/x-charts";
import { DatasetType, MakeOptional } from "@mui/x-charts/internals";

const TransactionDetail: FC<{
  account: Account;
}> = ({ account: { transactions } }) => {
  const chart_data_ref = useRef<{
    dataset: DatasetType;
    series: MakeOptional<BarSeriesType, "type">[];
  } | null>(null);
  const { current: chart_data } = chart_data_ref;

  if (!chart_data) {
    const periods = gperiods(1404);

    const dataset: DatasetType = periods.map((period) => {
      const d: {
        [key: string]: number | string;
      } = {};
      transactions.forEach((t) => {
        d[`${t.name}`] = transaction_value_for_period(t, period);
      });
      d["period"] = period;
      return d;
    });

    const series: MakeOptional<BarSeriesType, "type">[] = transactions.map(
      ({ name }) => ({
        dataKey: name,
        label: name,
        stack: "a",
        valueFormatter: accounting_display,
      })
    );

    chart_data_ref.current = { dataset, series };
  }

  if (!chart_data) return;
  const { dataset, series } = chart_data;

  console.log("TransactionDetail I ran!")

  return (
    <BarChart
      dataset={dataset}
      series={series}
      height={400}
      margin={{
        left: 80,
        bottom: 120,
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
      slotProps={{
        legend: {
          position: {
            vertical: "bottom",
            horizontal: "middle",
          },
          classes: {
            row: "row_classes_iman",
          },
        },
      }}
    />
  );
};

export default TransactionDetail;
