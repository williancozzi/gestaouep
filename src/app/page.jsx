"use client";
import styles from "./styles/Structure.module.scss";
import Image from "next/image";
import { Button, Stack } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import addDataToFireStore from "./utils";
import SideMenu from "./components/SideMenu";
import logo from "../../public/logo.png";

function Header() {
  const { data: session } = useSession();

  return (
    <div className={styles.header}>
      {session ? (
        <Stack
          direction="row"
          spacing={8}
          width="100%"
          justifyContent="space-between"
        >
          <Image
            src={logo}
            alt="logo"
            width={90}
            height={90}
            style={{ marginBottom: 2 }}
          />
          <div className={styles.signin}>
            Olá {session.user?.name || session.user?.email}
            <Button onClick={() => signOut()} variant="contained">
              Sair
            </Button>
          </div>
        </Stack>
      ) : (
          <Stack
            direction="row"
            spacing={8}
            width="100%"
            justifyContent="space-between"
          >
            <Image
              src={logo}
              alt="logo"
              width={90}
              height={90}
              style={{ marginBottom: 2 }}
            />
            <div className={styles.signin}>
              <Button
                onClick={() => signIn()}
                variant="contained"
                color="primary"
              >
                Entrar
              </Button>
            </div>
          </Stack>
      )}
    </div>
  );
}
export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Header />
      {session ? (
        <>
          <SideMenu />
          <div>
            <Button
              onClick={() => addDataToFireStore()}
              variant="contained"
              color="primary"
            >
              Gravar
            </Button>
          </div>
        </>
      ) : null}
    </main>
  );
}
