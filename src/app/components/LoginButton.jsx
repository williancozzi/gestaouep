import { Box, Button } from "@mui/material";
import React from "react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => signIn({ callbackUrl: "/dashboard" })}
      >
        Entrar
      </Button>
    </Box>
  );
}
