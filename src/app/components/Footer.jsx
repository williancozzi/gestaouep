import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      component="footer"
      style={{
        height: "32px",
        display: "flex",
        minWidth: "100%",
        backgroundImage:
          "linear-gradient(to bottom, #007b93, #c0c0c0 1%, transparent 99%, transparent)",
      }}
    >
      <Typography variant="body2" color="textSecondary" mt={1.5}>
        {`© Piracicaba ${new Date().getFullYear()} - Feito com 🧡 para a União Espírita de Piracicaba.`}
      </Typography>
    </Container>
  );
};

export default Footer;
