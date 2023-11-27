import { collection, addDoc } from "firebase/firestore";
import { firebase } from "../../../firebase.config";

export default async function saveIncomesToFirestore(income) {
  try {
    const docRef = await addDoc(collection(firebase.db, "incomes"), income);

    console.log("Nova receita com ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar documento ", error);
    throw new Error("Falha ao salvar os dados no banco.");
  }
}
