import React, { useState, useEffect } from "react";
import { incomeClass, incomeType } from "./FinancialSelect";
import FinancialDialog from "./FinancialDialog";
import CustomizedSnackbars from "../CustomizedSnackbars";
import { saveIncomesToFirestore } from "../../services/saveIncomesToFirestore";

export default function IncomeModal({
  open,
  onClose,
  initialFormData,
  editingIncomeId,
  refreshIncomes,
}) {
  const defaultFormData = {
    selectedIncomeOrigin: "",
    selectedIncomeType: "",
    incomeValue: "",
    incomeDescription: "",
  };

  const [formData, setFormData] = useState(initialFormData || defaultFormData);
  const [snackBarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(initialFormData || defaultFormData);
    } else {
      setFormData(defaultFormData);
    }
  }, [open, initialFormData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === "incomeValue" ? String(value) : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("Form Data income:", formData);
      await saveIncomesToFirestore(formData, editingIncomeId);

      setSnackbarStatus({
        isOpen: true,
        message: "Receita incluída com sucesso!",
        severity: "success",
      });

      setFormData(initialFormData);
      onClose();
      refreshIncomes();
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

  return (
    <>
      <FinancialDialog
        open={open}
        handleClose={onClose}
        handleFormSubmit={handleSubmit}
        snackBarStatus={snackBarStatus}
        formData={formData}
        handleInputChange={handleInputChange}
        formTitle={editingIncomeId ? "Editar receita" : "Nova receita"}
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
