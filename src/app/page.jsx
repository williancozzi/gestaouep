"use client";

import logo from "../../public/logo-preto.png";
import { Box, Stack, Grid, Typography } from "@mui/material";
import Image from "next/image";
import LoginButton from "./components/LoginButton";
import Loading from "./components/Loading";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/page";
import { getRandomImage, getPhrase } from "./utils";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [randomImage, setRandomImage] = useState(getRandomImage());
  const [randomPhrase, setRandomPhrase] = useState(getPhrase());

  useEffect(() => {
    if (session !== undefined) {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <Stack minHeight="100vh" justifyContent="center">
        <Loading />
      </Stack>
    );
  }

  if (!session) {
    return (
      <Grid container style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <Grid item xs={6} sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              priority={true}
              src={randomImage}
              alt="União Espírita de Piracicaba"
              width={1000}
              height={1000}
            />
            <Typography
              sx={{
                width: "75%",
                position: "absolute",
                top: "70%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#ecffff",
                fontSize: 42,
                fontWeight: 700,
                textShadow: "3px 2px 1px rgba(0, 0, 0, 1)",
                boxShadow: "inset 0px 0px 500px rgba(255, 255, 255, 0.4)",
                borderRadius: "8px",
              }}
            >
              {randomPhrase}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Stack
            alignItems="center"
            justifyContent="center"
            style={{ height: "100vh" }}
          >
            <Box textAlign="center" mb={4}>
              <Image priority={true} src={logo} alt="logo" />
            </Box>
            <LoginButton />
          </Stack>
        </Grid>
      </Grid>
    );
  }

  return <Dashboard />;
}
