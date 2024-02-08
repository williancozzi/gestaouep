import { collection, getDocs } from "firebase/firestore";
import { firebase } from "../../../firebase.config";

export async function getExpensesFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(firebase.db, "expenses"));
    const expenses = [];

    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });

    return expenses;
  } catch (error) {
    console.error("Erro ao obter documentos: ", error);
    throw new Error("Falha ao obter os dados do banco.");
  }
}
