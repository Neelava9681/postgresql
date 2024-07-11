"use client"


import Image from "next/image";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ShowContactPage from "./showContact/page";



export default function Home() {





  return (
    <main className="bg-black min-h-screen">
      <ShowContactPage/>
    </main>
  );
}
