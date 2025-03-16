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
        <ThemeProvider theme={theme}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider theme={theme} navigation={NAVIGATION} branding={BRANDING}>
              {children}
            </NextAppProvider>
          </React.Suspense>
        </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default SSR_Providers;
