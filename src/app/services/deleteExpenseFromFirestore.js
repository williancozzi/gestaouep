import { doc, deleteDoc } from "firebase/firestore";
import { firebase } from "../../../firebase.config";

export async function deleteExpenseFromFirestore(expenseId) {
  try {
    const expenseDocRef = doc(firebase.db, "expenses", expenseId);
    await deleteDoc(expenseDocRef);

    console.log("Despesa excluída com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao excluir documento ", error);
    throw new Error("Falha ao excluir os dados do banco.");
  }
}
