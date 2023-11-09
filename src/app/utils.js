export default async function addDataToFireStore() {
  try {
    // const docRef = await addDoc(collection(db, "users"), {
    //   email: "teste@gmail.com",
    //   nome: "Teste",
    //   profile: "admin",
    // });
    // console.log("Novo documento com ID: ", docRef.id);
    const docRef = await addDoc(collection(firebase.db, "users"), {
      email: "caba@gmail.com",
      nome: "João",
      profile: "admin",
      endereco: {
        logradouro: "Quadra 6 Conjunto 8",
        numero: "3",
      },
    });
    console.log("Novo documento com ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar documento ", error);
    return false;
  }
}

// export async function updateUsername() {
//   const user = firebase.auth.currentUser;
//   console.log("User to update:", user);

//   updateProfile(user, {
//     displayName: "Gabriel",
//   })
//     .then(() => {
//       console.log("Nome do usuário atualizado com sucesso");
//     })
//     .catch((error) => {
//       console.error("Erro ao atualizar o nome do usuário:", error);
//     });
// }
