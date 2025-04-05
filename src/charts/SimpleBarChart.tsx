import { accounting_mt_display } from '@/app/(dashboard)/reports/[report_slug]/_/utils'
import { BarChart, BarChartProps } from '@mui/x-charts'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import React from 'react'

const SimpleBarChart = (props: {dataset: BarChartProps['dataset'], series: BarChartProps['series']}) => {
  return (
    <BarChart
    height={300}
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
    {...props}
      />
  )
}

export default SimpleBarChart