"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import FinancialSelect from "./FinancialSelect";
import { Box, Stack, TextField, Button } from "@mui/material";
import { incomeClass, incomeType } from "./FinancialSelect";
import CustomizedSnackbars from "./CustomizedSnackbars";

export default function IncomePanel() {
  const [formData, setFormData] = useState({
    selectedIncomeOrigin: "",
    selectedIncomeType: "",
    incomeValue: "",
    incomeDescription: "",
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedValue = name === "incomeValue" ? String(value) : value;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form Data income:", formData);

    setIsSnackbarOpen(true);

    setFormData({
      selectedIncomeOrigin: "",
      selectedIncomeType: "",
      incomeValue: "",
      incomeDescription: "",
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} id="income-panel-form">
      <Stack spacing={2} mt={2}>
        <Box>
          <Typography gutterBottom>Registre a origem da receita:</Typography>
          <FinancialSelect
            typeOrClass={incomeClass}
            name="selectedIncomeOrigin"
            onChange={handleInputChange}
            value={formData.selectedIncomeOrigin}
          />
        </Box>
        <Box>
          <Typography gutterBottom>
            Registre a forma de pagamento da receita:
          </Typography>
          <FinancialSelect
            typeOrClass={incomeType}
            name="selectedIncomeType"
            onChange={handleInputChange}
            value={formData.selectedIncomeType}
          />
        </Box>
        <Box>
          <Typography gutterBottom>Registre o valor da receita:</Typography>
          <TextField
            id="incomeValue"
            label="Valor em R$"
            name="incomeValue"
            type="number"
            onChange={handleInputChange}
            value={formData.incomeValue}
            sx={{ ml: "8px" }}
          />
        </Box>
        <Box>
          <Typography gutterBottom>
            Registre uma descrição ou observação sobre essa receita:
          </Typography>
          <TextField
            id="incomeDescription"
            label="Descrição/observação"
            multiline
            rows={12}
            sx={{ minWidth: "40vw", mt: "4px", ml: "8px" }}
            name="incomeDescription"
            onChange={handleInputChange}
            value={formData.incomeDescription}
          />
        </Box>
        <Box textAlign={"right"}>
          <Button variant="contained" type="submit">
            Adicionar receita
          </Button>
        </Box>
      </Stack>
      <CustomizedSnackbars
        isOpen={isSnackbarOpen}
        handleClose={handleSnackbarClose}
      />
    </form>
  );
}
