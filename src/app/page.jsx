"use client";

import { useSession } from "next-auth/react";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import { Box } from "@mui/material";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Header />
      {session ? (
        <Box display={"flex"}>
          <SideMenu />
          <Box sx={{ color: "black"}}>miolo</Box>
        </Box>
      ) : null}
    </main>
  );
}
