import { Box } from "@mui/material";
import { Branding, Navigation } from "@toolpad/core";
import Image from "next/image";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ForumIcon from '@mui/icons-material/Forum';
import { AccountBalance, TrendingUp } from "@mui/icons-material";

export const NAVIGATION: Navigation = [
  {
    title: "گزارش‌های بودجه",
    segment: "reports",
    icon: <AssessmentIcon />,
    children: [
      {
        title: "صورت وضعیت مالی",
        segment: "balance-sheet", 
        icon: <AccountBalance />,
      },
      {
        title: "صورت سود و زیان",
        segment: "income-statement",
        icon: <TrendingUp />,
      },
    ]
  },
  {
    title: "پیام برای توسعه‌دهنده",
    segment: "contact-developer",
    icon: <ForumIcon />,
  },
];

export const BRANDING: Branding = {
  title: "داشبورد مدیریت کولایف",
  logo: (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Image src={"/logo.png"} alt="لوگو" width={24} height={24} />
    </Box>
  ),
};
