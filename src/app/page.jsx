"use client";

import logo from "../../public/logo-azul.png";
import { Box, Stack, Grid } from "@mui/material";
import Image from "next/image";
import LoginButton from "./components/LoginButton";
import Loading from "./components/Loading";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/page";
import { getRandomImage } from "./utils";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [randomImage, setRandomImage] = useState(getRandomImage());

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
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Image
              priority={true}
              src={randomImage}
              alt="União Espírita de Piracicaba"
              width={820}
              height={640}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack>
            <Image
              priority={true}
              src={logo}
              alt="logo"
              width={120}
              height={120}
              style={{ marginBottom: "18px" }}
            />
            <Box sx={{ paddingLeft: 3}}>
              <LoginButton />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    );
  }

  return <Dashboard />;
}
