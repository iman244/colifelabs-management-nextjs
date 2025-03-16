"use client";
import { Button, Container, Typography, useColorScheme } from "@mui/material";

export default function Home() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

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
      <Button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
        Toggle
      </Button>
      <Typography>{mode}</Typography>
    </Container>
  );
}
