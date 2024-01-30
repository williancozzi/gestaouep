import { doc, deleteDoc } from "firebase/firestore";
import { firebase } from "../../../firebase.config";

export async function deleteIncomeFromFirestore(incomeId) {
  try {
    const incomeDocRef = doc(firebase.db, "incomes", incomeId);
    await deleteDoc(incomeDocRef);

    console.log("Receita excluída com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao excluir documento ", error);
    throw new Error("Falha ao excluir os dados do banco.");
  }
}
