"use client";

import React, { useContext } from "react";
import ShowContact from "./ShowContact";
import UserContext from "@/context/UserContext";

export default function ShowContactPage() {
  const context = useContext(UserContext);
  console.log(context);

  return (
    <>
      {context.user ? (
        <ShowContact />
      ) : (
        <div className="bg-black ">
          <h1 className="text-white text-4xl p-6 flex justify-center">
            You have To Login First
          </h1>
        </div>
      )}
    </>
  );
}
