import React, { FC, ReactNode } from "react";
import SSR_Providers from "./ssr_providers";
import Client_Providers from "./client_providers";

const Providers: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <SSR_Providers>
      <Client_Providers>{children}</Client_Providers>
    </SSR_Providers>
  );
};

export default Providers;
