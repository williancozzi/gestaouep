import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getIncomesFromFirestore } from "../../services/getIncomesFromFirestore";
import { Stack } from "@mui/material";

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
  }, []);

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

  const handleEdit = (incomeId) => {
    const editedIncome = incomes.find((income) => income.id === incomeId);
    console.log("Edit clicked for income:", editedIncome);
    // Add your edit logic here
  };

  const handleDelete = (incomeId) => {
    const deletedIncome = incomes.find((income) => income.id === incomeId);
    console.log("Delete clicked for income:", deletedIncome);
    // Add your delete logic here
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
          <TableCell>
            <Stack direction="row" spacing={4}>
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(income.id)}
              />
              <DeleteIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDelete(income.id)}
              />
            </Stack>
          </TableCell>
        </TableRow>
      ));
  };

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="tabela de receitas">
          <TableHead sx={{ backgroundColor: "#d9d9db" }}>
            <TableRow>
              <TableCell>Origem</TableCell>
              <TableCell>Forma de Pagamento</TableCell>
              <TableCell>Valor (R$)</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Opções</TableCell>
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
