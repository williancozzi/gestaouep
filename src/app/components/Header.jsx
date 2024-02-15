"use client";

import styles from "../styles/Structure.module.scss";
import { Button, Stack, Typography } from "@mui/material";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return session ? (
    <div className={styles.header}>
      <Stack
        direction="row"
        spacing={8}
        width="100%"
        height="100%"
        justifyContent="space-between"
        sx={{ backgroundColor: "#fff" }}
      >
        <Typography className={styles.signin} fontWeight={500} fontSize={24}>
          Financeiro
        </Typography>
        <div className={styles.signin}>
          Olá {session.user?.name || session.user?.email}
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="contained"
          >
            Sair
          </Button>
        </div>
      </Stack>
    </div>
  ) : null;
}
