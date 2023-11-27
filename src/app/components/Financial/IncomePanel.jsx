"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import FinancialSelect from "./FinancialSelect";
import { Box, Stack, TextField, Button } from "@mui/material";
import { incomeClass, incomeType } from "./FinancialSelect";
import CustomizedSnackbars from "../CustomizedSnackbars";
import saveIncomesToFirestore from "../../services/saveIncomesToFirestore";

export default function IncomePanel() {
  const [formData, setFormData] = useState({
    selectedIncomeOrigin: "",
    selectedIncomeType: "",
    incomeValue: "",
    incomeDescription: "",
  });

  const [snackBarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedValue = name === "incomeValue" ? String(value) : value;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      console.log("Form Data income:", formData);

      await saveIncomesToFirestore(formData);

      setSnackbarStatus({
        isOpen: true,
        message: "Receita incluída com sucesso!",
        severity: "success",
      });

      setFormData({
        selectedIncomeOrigin: "",
        selectedIncomeType: "",
        incomeValue: "",
        incomeDescription: "",
      });
    } catch (error) {
      setSnackbarStatus({
        isOpen: true,
        message: `Erro: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarStatus({ isOpen: false });
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
            label="Escolha uma opção"
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
            label="Escolha uma opção"
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
            required
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
            sx={{ minWidth: "33vw", mt: "4px", ml: "8px" }}
            name="incomeDescription"
            onChange={handleInputChange}
            value={formData.incomeDescription}
          />
        </Box>
        <Box textAlign={"left"} pl={1}>
          <Button variant="contained" type="submit">
            Adicionar receita
          </Button>
        </Box>
      </Stack>
      <CustomizedSnackbars
        severity={snackBarStatus.severity}
        message={snackBarStatus.message}
        isOpen={snackBarStatus.isOpen}
        handleClose={handleSnackbarClose}
      />
    </form>
  );
}
