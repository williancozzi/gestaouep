import "./globals.css";
import AuthContext from "./authContext";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import { Box } from "@mui/material";

export const metadata = {
  title: "Gestão UEP",
  description: "Sistema de Gestão da União Espírita de Piracicaba",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <AuthContext>
        <body>
          <Header />
          <Box display={"flex"}>
            <SideMenu />
            <Box margin={2} color={"black"}>
              {children}
            </Box>
          </Box>
        </body>
      </AuthContext>
    </html>
  );
}
