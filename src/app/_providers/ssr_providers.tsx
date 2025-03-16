import React, { FC, ReactNode } from "react";
import theme from "@/theme";
import { NextAppProvider } from "@toolpad/core/nextjs";
import LinearProgress from "@mui/material/LinearProgress";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material";
import { BRANDING, NAVIGATION } from "@/app/dashboard";

const SSR_Providers: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <React.Suspense fallback={<LinearProgress />}>
        <NextAppProvider
          navigation={NAVIGATION}
          branding={BRANDING}
        >
          <ThemeProvider theme={theme}>
          {children}
          </ThemeProvider>
        </NextAppProvider>
      </React.Suspense>
    </AppRouterCacheProvider>
  );
};

export default SSR_Providers;
