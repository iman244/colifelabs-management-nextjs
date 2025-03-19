"use client";
import { Container, Typography } from "@mui/material";

export default function Home() {

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Typography>dashboard</Typography>
    </Container>
  );
}
