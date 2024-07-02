import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}