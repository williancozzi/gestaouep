"use client";
import { Container } from "@mui/material";
import FinancialTabs from "../components/Financial/FinancialTabs";

export default function FinancialPage() {
  return (
    <Container sx={{ ml: 1, mt: 2, }}>
      <FinancialTabs />
    </Container>
  );
}
