'use client';

import { useContext } from "react";
import LoginForm from "./(Auth)/LoginForm/LoginForm";
import { AuthContext } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";


export default function Home() {

  return (
    <>
      <LoginForm />
    </>
  );
}
