import React, { FC, ReactNode } from "react";
import Client_Providers from "./client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { LinearProgress, ThemeProvider } from "@mui/material";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { BRANDING, NAVIGATION } from "@/app/dashboard";
import theme from "@/theme";

const Providers: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <React.Suspense fallback={<LinearProgress />}>
        <NextAppProvider navigation={NAVIGATION} branding={BRANDING}>
          <ThemeProvider theme={theme}>
            <Client_Providers>{children}</Client_Providers>
          </ThemeProvider>
        </NextAppProvider>
      </React.Suspense>
    </AppRouterCacheProvider>
  );
};

export default Providers;
