import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export const incomeType = [
  "Pix",
  "Depósito Bancário",
  "Cheque",
  "Dinheiro em espécie",
  "Outros",
];

export const incomeClass = [
  "Aluguel",
  "Torta",
  "Bazar",
  "Festa",
  "Brechório",
  "Livraria",
  "Outros",
];

export const expenseType = [
  "Pix",
  "Depósito Bancário",
  "Cheque",
  "Dinheiro em espécie",
  "Cartão de crédito",
  "Cartão de dédito",
  "Outros",
];

export const expenseClass = [
  "IPTU",
  "Internet/Telefone",
  "Luz",
  "Água",
  "Manutenção predial",
  "Outros",
];

export default function FinancialSelect({
  typeOrClass,
  name,
  onChange,
  value,
  label,
}) {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
    >
      <TextField
        id={`outlined-select-${name}`}
        select
        value={value}
        onChange={onChange}
        sx={{ minWidth: "22vw" }}
        name={name}
        label={label}
        defaultValue="Escolha uma"
      >
        {typeOrClass &&
          typeOrClass.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
}
