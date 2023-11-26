"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import FinancialSelect from "../Financial/FinancialSelect";
import { Box, Stack, TextField, Button } from "@mui/material";
import { expenseClass, expenseType } from "../Financial/FinancialSelect";
import CustomizedSnackbars from "../CustomizedSnackbars";
import saveExpensestoFirestore from "../../services/saveExpensestoFirestore";

export default function ExpensePanel() {
  const [formData, setFormData] = useState({
    selectedExpenseOrigin: "",
    selectedExpenseType: "",
    expenseValue: "",
    expenseDescription: "",
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedValue = name === "expenseValue" ? String(value) : value;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form Data expenses:", formData);

    await saveExpensestoFirestore(formData);

    setIsSnackbarOpen(true);

    setFormData({
      selectedExpenseOrigin: "",
      selectedExpenseType: "",
      expenseValue: "",
      expenseDescription: "",
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} id="expense-panel-form">
      <Stack spacing={2} mt={2}>
        <Box>
          <Typography gutterBottom>Registre a origem da despesa:</Typography>
          <FinancialSelect
            typeOrClass={expenseClass}
            name="selectedExpenseOrigin"
            onChange={handleInputChange}
            value={formData.selectedExpenseOrigin}
          />
        </Box>
        <Box>
          <Typography gutterBottom>
            Registre a forma de pagamento da despesa:
          </Typography>
          <FinancialSelect
            typeOrClass={expenseType}
            name="selectedExpenseType"
            onChange={handleInputChange}
            value={formData.selectedExpenseType}
          />
        </Box>
        <Box>
          <Typography gutterBottom>Registre o valor da despesa:</Typography>
          <TextField
            id="expenseValue"
            label="Valor em R$"
            name="expenseValue"
            type="number"
            onChange={handleInputChange}
            value={formData.expenseValue}
            sx={{ ml: "8px" }}
            required
          />
        </Box>
        <Box>
          <Typography gutterBottom>
            Registre uma descrição ou observação sobre essa despesa:
          </Typography>
          <TextField
            id="expenseDescription"
            label="Descrição/observação"
            multiline
            rows={12}
            sx={{ minWidth: "40vw", mt: "4px", ml: "8px" }}
            name="expenseDescription"
            onChange={handleInputChange}
            value={formData.expenseDescription}
          />
        </Box>
        <Box textAlign={"right"}>
          <Button variant="contained" type="submit">
            Adicionar despesa
          </Button>
        </Box>
      </Stack>
      <CustomizedSnackbars
        message="Despesa incluída com sucesso!"
        isOpen={isSnackbarOpen}
        handleClose={handleSnackbarClose}
      />
    </form>
  );
}
