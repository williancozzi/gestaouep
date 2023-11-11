"use client";
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
        backgroundColor: "#424242",
        height: "100vh",
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <Link href="/financial" passHref legacyBehavior>
              <ListItemButton>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Financeiro" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText primary="Associados" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  ) : null;
}
