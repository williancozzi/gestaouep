"use client";

import { Stack } from "@mui/material";
import LoginButton from "./components/LoginButton";
import Loading from "./components/Loading";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

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
      <Stack
        textAlign="center"
        minHeight="100vh"
        minWidth="100vw"
        justifyContent="center"
      >
        <LoginButton />
      </Stack>
    );
  }

  return <Dashboard />;
}
