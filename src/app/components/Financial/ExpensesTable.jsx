import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getExpensesFromFirestore } from "../../services/getExpensesFromFirestore";
import { deleteExpenseFromFirestore } from "../../services/deleteExpenseFromFirestore";
import { Box, Stack } from "@mui/material";
import CustomizedSnackbars from "../CustomizedSnackbars";
import ExpenseModal from "./ExpenseModal";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function ExpensesTable({ totalExpense, setTotalExpense }) {
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [isFetchComplete, setIsFetchComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const [snackBarStatus, setSnackBarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      const expenses = await getExpensesFromFirestore();
      setExpenses(expenses);
      setIsFetchComplete(true);

      const total = expenses.reduce(
        (sum, expense) => sum + Number(expense.expenseValue),
        0
      );
      setTotalExpense(total);
    } catch (error) {
      console.error("Error fetching expenses from Firestore: ", error);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  function handleEdit(expenseId) {
    const editedExpense = expenses.find((expense) => expense.id === expenseId);
    setEditingExpense(editedExpense);
    setIsModalOpen(true);
  }

  const handleDelete = (expenseId) => {
    setExpenseToDelete(expenseId);
    setOpenDeleteDialog(true);
  };

  const handleEditDebounced = debounce(handleEdit, 1000);
  const handleDeleteDebounced = debounce(handleDelete, 1000);

  async function handleConfirmDelete() {
    try {
      const deletedExpense = expenses.find(
        (expense) => expense.id === expenseToDelete
      );

      await deleteExpenseFromFirestore(expenseToDelete);

      const updatedExpenses = await getExpensesFromFirestore();
      setExpenses(updatedExpenses);

      setSnackBarStatus({
        isOpen: true,
        severity: "success",
        message: "Despesa excluída com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao excluir a despesa: ", error);

      setSnackBarStatus({
        isOpen: true,
        severity: "error",
        message: "Erro ao excluir a despesa.",
      });
    } finally {
      setOpenDeleteDialog(false);
      setExpenseToDelete(null);
    }
  }

  const truncateText = (text, minLength) => {
    if (text.length < minLength) {
      return text.padEnd(minLength, " ");
    } else {
      return `${text.slice(0, minLength)}...`;
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBarStatus({
      ...snackBarStatus,
      isOpen: false,
    });
  };

  const handleDialogOpen = () => {
    setIsModalOpen(true);
  };

  const renderRows = () => {
    return expenses
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((expense) => (
        <TableRow
          key={expense.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {expense.selectedExpenseOrigin}
          </TableCell>
          <TableCell>{expense.selectedExpenseType}</TableCell>
          <TableCell>
            {parseFloat(expense.expenseValue).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
          <TableCell
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {truncateText(expense.expenseDescription, 110)}
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={4}>
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleEditDebounced(expense.id)}
              />
              <DeleteIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDeleteDebounced(expense.id)}
              />
            </Stack>
          </TableCell>
        </TableRow>
      ));
  };

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table aria-label="tabela de despesas">
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
          count={expenses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
        />

        <CustomizedSnackbars
          severity={snackBarStatus.severity}
          message={snackBarStatus.message}
          isOpen={snackBarStatus.isOpen}
          handleClose={handleCloseSnackBar}
        />
        <Box textAlign="right" pr={4} pb={2}>
          <Button variant="contained" onClick={handleDialogOpen}>
            ADICIONAR UMA NOVA DESPESA
          </Button>
          <ExpenseModal
            open={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingExpense(null);
            }}
            initialFormData={editingExpense}
            editingExpenseId={editingExpense?.id}
            refreshExpenses={fetchExpenses}
          />
        </Box>
        <DeleteConfirmationDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleConfirmDelete}
        />
      </Paper>
    </Box>
  );
}
