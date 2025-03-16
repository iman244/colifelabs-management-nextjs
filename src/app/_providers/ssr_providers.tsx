import React, { FC, ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const SSR_Providers: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
};

export default SSR_Providers;
