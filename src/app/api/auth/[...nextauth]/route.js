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
    logo: "https://static.wixstatic.com/media/05ed4b_97f6df34…85,usm_0.33_1.00_0.00,enc_auto/LOGO%20DEGRADE.png",
    buttonText: "#007b93",
  },
});

export { handler as GET, handler as POST };
