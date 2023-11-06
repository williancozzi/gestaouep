"use client";

import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Olá {session.user?.name || session.user?.email}
        <button onClick={() => signOut()}>Sair</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Entrar</button>
    </div>
  );
}
export default function Home() {
  return (
    <main>
      <Header />
    </main>
  );
}
