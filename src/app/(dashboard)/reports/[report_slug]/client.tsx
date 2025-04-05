"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { Classification, FinancialStatement } from "./type";
import {
  accounting_display,
  accounting_mt_display,
  classification_value_period,
  gperiods,
} from "./_/utils";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DatasetType } from "@mui/x-charts/internals";
import ClassificationAccountDetail from "./_/ClassificationAccountDetail";
import TransactionDetail from "./_/TransactionDetail";
import SimpleBarChart from "@/charts/SimpleBarChart";

const ReportClientPage: FC<{
  data: FinancialStatement;
}> = ({ data }) => {
  const [selectedClassification, setSelectedClassification] =
    useState<Classification | null>(null);
  const [series, setSeries] = useState<string>("");
  const dataset_ref = useRef<DatasetType>(null);
  const { current: dataset } = dataset_ref;

  if (!dataset_ref.current) {
    const year = 1404;
    const periods = gperiods(year);
    const _dataset: DatasetType = periods.map((period) => {
      const d: {
        [key: string]: number | string;
      } = {
        period,
      };

      data.classifications.forEach((c) => {
        d[`${c.name}`] = classification_value_period(
          c.id,
          data.classifications,
          period
        );
      });

      return d;
    });

    dataset_ref.current = _dataset;
    console.log("1. I ran!");
  }

  useEffect(() => {
    const root = data.classifications.find((c) => c.level == 0);
    if (root) {
      setSelectedClassification(root);
      setSeries(root.name);
    }
  }, []);

  useEffect(() => {
    const root = data.classifications.find((c) => c.name == series);
    if (root) {
      setSelectedClassification(root);
    }
  }, [series]);

  const cs = data.classifications.sort((a, b) => {
    if (a.level != b.level) {
      return b.level - a.level;
    }
    const dose_b_have_child = b.rght - b.lft != 1;
    const dose_a_have_child = a.rght - a.lft != 1;

    if (dose_b_have_child && !dose_a_have_child) {
      return 1;
    } else if (!dose_b_have_child && dose_a_have_child) {
      return -1;
    }
    return a.sibiling_order - b.sibiling_order;
  });

  return (
    <Container
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ minWidth: 120, mb: "40px" }}>
        <SelectClassification
          classifications={cs}
          series={series}
          setSeries={setSeries}
        />
      </Box>
      <SimpleBarChart
        dataset={dataset || []}
        series={[
          {
            dataKey: series,
            label: series,
            valueFormatter: accounting_display,
          },
        ]}
      />

      {selectedClassification && (
        <Container
          sx={{
            my: "20px",
          }}
        >
          <Typography
            sx={{
              my: "20px",
              textAlign: "center",
            }}
          >
            حساب‌های زیرمجموعه {selectedClassification.name}
          </Typography>
          <ClassificationAccountDetail
            selected_classification={selectedClassification}
            data={data}
          />
        </Container>
      )}
      {selectedClassification &&
        selectedClassification.accounts.map((a) => (
          <Container
            key={a.id}
            sx={{
              my: "20px",
            }}
          >
            <Typography
              sx={{
                my: "20px",
                textAlign: "center",
              }}
            >
              جزئیات حساب {a.name}
            </Typography>
            <TransactionDetail account={a} />
          </Container>
        ))}
    </Container>
  );
};

export default ReportClientPage;

const SelectClassification: FC<{
  classifications: Classification[];
  series: string;
  setSeries: React.Dispatch<string>;
}> = ({ classifications, series, setSeries }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSeries(event.target.value);
    // setSeries([
    //   {
    //     dataKey: event.target.value,
    //     label: event.target.value,
    //     valueFormatter: accounting_display,
    //   },
    // ]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">طبقه‌بندی</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={series}
        label="انتخاب"
        onChange={handleChange}
        variant="filled"
      >
        {classifications.map((c) => (
          <MenuItem
            key={c.id}
            value={c.name}
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Typography>{c.name}</Typography>
            <Typography>
              {accounting_mt_display(c.accural_budgets_value)}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
