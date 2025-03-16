"use client";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { prefixer } from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';

const theme = createTheme({
  direction: 'rtl',
  colorSchemes: {
    dark: true
  },
  typography: {
    fontFamily: '"Vazirmatn", sans-serif'
  }
});

  export const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  

export default theme;
