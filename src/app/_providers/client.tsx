"use client"
import { cacheRtl } from "@/theme";
import { CacheProvider } from "@emotion/react";
import React, { FC, ReactNode } from "react";

const Client_Providers: FC<Readonly<{ children: ReactNode }>> = ({
  children,
}) => {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
};

export default Client_Providers;
