import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import FinancialSelect from "./FinancialSelect";
import CustomizedSnackbars from "../CustomizedSnackbars";

const formatCurrency = (value) => {
  if (!value) return "";

  const numericValue = value.replace(/[^\d]/g, "");

  if (!numericValue) return ""; // Added to handle empty numericValue

  const floatValue = parseFloat(numericValue / 100).toFixed(2);

  if (isNaN(floatValue)) return "";

  const formattedValue = floatValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

const FinancialDialog = ({
  open,
  handleClose,
  handleFormSubmit,
  snackBarStatus,
  formData,
  handleInputChange,
  formTitle,
  formFields,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          minWidth: "90%",
          minHeight: "90%",
        },
      }}
    >
      <DialogTitle>{formTitle}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit} id="financial-panel-form">
          <Stack spacing={2}>
            {formFields.map((field) => (
              <Box key={field.name}>
                <Typography gutterBottom>{field.label}</Typography>
                {field.typeOrClass === "number" ? (
                  <TextField
                    type="number"
                    name={field.name}
                    label={field.label}
                    value={formatCurrency(formData[field.name])}
                    onChange={(e) => {
                      const inputText = e.target.value;
                      const formattedValue = formatCurrency(inputText);

                      handleInputChange({
                        target: { name: field.name, value: formattedValue },
                      });
                    }}
                    sx={{ m: 1, minWidth: "22vw" }}
                  />
                ) : field.typeOrClass === "text" ? (
                  <TextField
                    type="text"
                    name={field.name}
                    label={field.label}
                    value={formData[field.name]}
                    onChange={(e) => {
                      const inputText = e.target.value;

                      handleInputChange({
                        target: { name: field.name, value: inputText },
                      });
                    }}
                    sx={{ m: 1, minWidth: "44vw" }}
                    rows={12}
                    multiline
                  />
                ) : (
                  <FinancialSelect
                    typeOrClass={field.typeOrClass}
                    name={field.name}
                    onChange={handleInputChange}
                    value={formData[field.name]}
                    label={field.label}
                  />
                )}
              </Box>
            ))}
          </Stack>
          <CustomizedSnackbars
            severity={snackBarStatus.severity}
            message={snackBarStatus.message}
            isOpen={snackBarStatus.isOpen}
            handleClose={handleClose}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleFormSubmit} color="primary" variant="contained">
          {formTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinancialDialog;
