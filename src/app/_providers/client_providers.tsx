import React, { FC, ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";

const Client_Providers: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Client_Providers;
