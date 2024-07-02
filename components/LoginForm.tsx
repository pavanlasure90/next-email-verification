"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession<any>();
  console.log(session)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(user);

      if (user?.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("/home");
    } catch (error) {
      setError("Failed to sign in");
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-500">
        <h1 className="text-xl font-bold my-4">Enter Details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-orange-500 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link href="/register" passHref>
            <span className="text-sm mt-3 text-right">
              Don't have an account? <span className="underline">Register</span>
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
