import { Box } from "@mui/material";
import { Branding, Navigation } from "@toolpad/core";
import Image from "next/image";

export const NAVIGATION: Navigation = [
  {
    title: "گزارش‌های مالی",
    segment: "",
  },
  {
    title: "پیام برای توسعه‌دهنده",
    segment: "about",
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
