import React, { useState } from "react";
import { incomeClass, incomeType } from "./FinancialSelect";
import { Button } from "@mui/material";
import FinancialDialog from "./FinancialDialog";
import CustomizedSnackbars from "../CustomizedSnackbars";
import { saveIncomesToFirestore } from "../../services/saveIncomesToFirestore";

export default function IncomeModal() {
  const initialFormData = {
    selectedIncomeOrigin: "",
    selectedIncomeType: "",
    incomeValue: "",
    incomeDescription: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [snackBarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

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

      setFormData(initialFormData);
      setOpenDialog(false);
      // window.location.reload();
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

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleDialogOpen}>
        ADICIONAR UMA NOVA RECEITA
      </Button>
      <FinancialDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleFormSubmit={handleSubmit}
        snackBarStatus={snackBarStatus}
        formData={formData}
        handleInputChange={handleInputChange}
        formTitle="Adicionar Receita"
        formFields={[
          {
            name: "selectedIncomeOrigin",
            label: "Registre a origem da receita:",
            typeOrClass: incomeClass,
          },
          {
            name: "selectedIncomeType",
            label: "Registre a forma de pagamento da receita:",
            typeOrClass: incomeType,
          },
          {
            name: "incomeValue",
            label: "Registre o valor da receita:",
            typeOrClass: "number",
          },
          {
            name: "incomeDescription",
            label: "Registre uma descrição ou observação sobre essa receita:",
            typeOrClass: "text",
          },
        ]}
      />
      <CustomizedSnackbars
        severity={snackBarStatus.severity}
        message={snackBarStatus.message}
        isOpen={snackBarStatus.isOpen}
        handleClose={handleSnackbarClose}
      />
    </>
  );
}
