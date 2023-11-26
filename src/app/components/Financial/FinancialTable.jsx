import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const arrayOfObjects = Array.from({ length: 30 }, () => ({
  selectedIncomeOrigin: generateRandomString(10),
  selectedIncomeType: generateRandomString(10),
  incomeValue: Math.floor(Math.random() * 1000) + 1,
  incomeDescription: generateRandomString(80),
}));

export default function FinancialTable() {
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const truncateText = (text, minLength) => {
    if (text.length < minLength) {
      return text.padEnd(minLength, " ");
    } else {
      return `${text.slice(0, minLength)}...`;
    }
  };

  const renderRows = () => {
    return arrayOfObjects
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((arrayOfObject) => (
        <TableRow
          key={arrayOfObject.selectedIncomeOrigin}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {arrayOfObject.selectedIncomeOrigin}
          </TableCell>
          <TableCell>{arrayOfObject.selectedIncomeType}</TableCell>
          <TableCell>{arrayOfObject.incomeValue}</TableCell>
          <TableCell
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {truncateText(arrayOfObject.incomeDescription, 40)}
          </TableCell>
        </TableRow>
      ));
  };

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="tabela de receitas">
          <TableHead>
            <TableRow>
              <TableCell>Origem</TableCell>
              <TableCell>Forma de Pgto</TableCell>
              <TableCell>Valor (R$)</TableCell>
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={arrayOfObjects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
}
