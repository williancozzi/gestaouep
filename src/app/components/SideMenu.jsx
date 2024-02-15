"use client";
import logo from "../../../public/logo.webp";
import Image from "next/image";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Groups from "@mui/icons-material/Groups";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SideMenu() {
  const { data: session } = useSession();

  return session ? (
    <Box
      sx={{
        minWidth: 230,
        height: "100%",
        borderRight: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <Link href={"/dashboard"}>
            <Image
              priority={true}
              src={logo}
              alt="logo"
              width={280}
              height={90}
              style={{ marginBottom: 2 }}
            />
          </Link>
          <ListItem disablePadding>
            <Link href="/financial" passHref legacyBehavior>
              <ListItemButton>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Financeiro"
                  sx={{
                    color: "black",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText
                primary="Associados"
                sx={{
                  color: "black",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  ) : null;
}
