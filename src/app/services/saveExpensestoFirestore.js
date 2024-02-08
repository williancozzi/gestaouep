import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { firebase } from "../../../firebase.config";

export async function saveExpensesToFirestore(
  expense,
  editingExpenseId = null
) {
  try {
    if (editingExpenseId) {
      const expenseRef = doc(firebase.db, "expenses", editingExpenseId);
      await updateDoc(expenseRef, expense);
      console.log("Despesa atualizada com ID: ", editingExpenseId);
    } else {
      const docRef = await addDoc(collection(firebase.db, "expenses"), expense);
      console.log("Nova despesa com ID: ", docRef.id);
    }

    return true;
  } catch (error) {
    console.error("Erro ao salvar/atualizar documento ", error);
    throw new Error("Falha ao salvar/atualizar os dados no banco.");
  }
}
