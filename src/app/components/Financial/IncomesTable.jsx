import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { getIncomesFromFirestore } from "../../services/getIncomesFromFirestore";

export default function IncomesTable() {
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [isFetchComplete, setIsFetchComplete] = useState(false);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const incomesFromFirestore = await getIncomesFromFirestore();
        setIncomes(incomesFromFirestore);
        setIsFetchComplete(true);
      } catch (error) {
        console.error("Erro ao obter incomes do Firestore: ", error);
      }
    };

    fetchIncomes();
  }, [incomes]);

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
    return incomes
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((income) => (
        <TableRow
          key={income.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {income.selectedIncomeOrigin}
          </TableCell>
          <TableCell>{income.selectedIncomeType}</TableCell>
          <TableCell>{income.incomeValue}</TableCell>
          <TableCell
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {truncateText(income.incomeDescription, 40)}
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
        count={incomes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
}
