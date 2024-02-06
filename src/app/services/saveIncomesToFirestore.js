import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { firebase } from "../../../firebase.config";

export async function saveIncomesToFirestore(income, editingIncomeId = null) {
  try {
    if (editingIncomeId) {
      const incomeRef = doc(firebase.db, "incomes", editingIncomeId);
      await updateDoc(incomeRef, income);
      console.log("Receita atualizada com ID: ", editingIncomeId);
    } else {
      const docRef = await addDoc(collection(firebase.db, "incomes"), income);
      console.log("Nova receita com ID: ", docRef.id);
    }

    return true;
  } catch (error) {
    console.error("Erro ao salvar/atualizar documento ", error);
    throw new Error("Falha ao salvar/atualizar os dados no banco.");
  }
}
