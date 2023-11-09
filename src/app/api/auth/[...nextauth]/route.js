import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/../firebase.config";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials, req) {
        if (credentials == null) return null;

        const { user } = await signIn(
          credentials.username,
          credentials.password
        );
        if (user) {

          const nextUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          };

          console.log("User: ", user);

          return nextUser;
        }

        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  //   error: "/auth/error",
  // },
  theme: {
    colorScheme: "light",
    brandColor: "#007b93",
    logo: "https://cdn.discordapp.com/attachments/445728799850627082/1171870697627340800/logo-azul.png",
    buttonText: "#007b93",
  },
});

export { handler as GET, handler as POST };
