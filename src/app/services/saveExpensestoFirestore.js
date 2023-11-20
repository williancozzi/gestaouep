import { collection, addDoc } from "firebase/firestore";
import { firebase } from "../../../firebase.config";

export default async function saveExpensestoFirestore(expense) {
  try {
    const docRef = await addDoc(collection(firebase.db, "expenses"), expense);

    console.log("Nova despesa com ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar documento ", error);
    return false;
  }
}
