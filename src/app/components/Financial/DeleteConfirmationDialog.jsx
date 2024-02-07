import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Excluir Receita</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir esta receita?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
