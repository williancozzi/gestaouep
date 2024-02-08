import React, { useState, useEffect } from "react";
import { expenseClass, expenseType } from "./FinancialSelect";
import FinancialDialog from "./FinancialDialog";
import CustomizedSnackbars from "../CustomizedSnackbars";
import { saveExpensesToFirestore } from "../../services/saveExpensesToFirestore.js";

export default function ExpenseModal({
  open,
  onClose,
  initialFormData,
  editingExpenseId,
  refreshExpenses,
}) {
  const defaultFormData = {
    selectedExpenseOrigin: "",
    selectedExpenseType: "",
    expenseValue: "",
    expenseDescription: "",
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
    const updatedValue = name === "expenseValue" ? String(value) : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("Form Data expense:", formData);
      await saveExpensesToFirestore(formData, editingExpenseId);

      setSnackbarStatus({
        isOpen: true,
        message: "Despesa incluída com sucesso!",
        severity: "success",
      });

      setFormData(initialFormData);
      onClose();
      refreshExpenses();
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
        formTitle={editingExpenseId ? "Editar despesa" : "Nova despesa"}
        formFields={[
          {
            name: "selectedExpenseOrigin",
            label: "Registre a origem da despesa:",
            typeOrClass: expenseClass,
          },
          {
            name: "selectedExpenseType",
            label: "Registre a forma de pagamento da despesa:",
            typeOrClass: expenseType,
          },
          {
            name: "expenseValue",
            label: "Registre o valor da despesa:",
            typeOrClass: "number",
          },
          {
            name: "expenseDescription",
            label: "Registre uma descrição ou observação sobre essa despesa:",
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
