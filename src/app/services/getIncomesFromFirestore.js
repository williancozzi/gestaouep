import { collection, getDocs } from "firebase/firestore";
import { firebase } from "../../../firebase.config";

export async function getIncomesFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(firebase.db, "incomes"));
    const incomes = [];

    querySnapshot.forEach((doc) => {
      incomes.push({ id: doc.id, ...doc.data() });
    });

    return incomes;
  } catch (error) {
    console.error("Erro ao obter documentos: ", error);
    throw new Error("Falha ao obter os dados do banco.");
  }
}
