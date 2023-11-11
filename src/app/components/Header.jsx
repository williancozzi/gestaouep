"use client";
import logo from "../../../public/logo.png";
import styles from "../styles/Structure.module.scss";
import Image from "next/image";
import { Button, Stack } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return session ? (
    <div className={styles.header}>
      <Stack
        direction="row"
        spacing={8}
        width="100%"
        justifyContent="space-between"
      >
        <Link href={"/dashboard"}>
          <Image
            priority={true}
            src={logo}
            alt="logo"
            width={80}
            height={80}
            style={{ marginBottom: 2 }}
          />
        </Link>
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
