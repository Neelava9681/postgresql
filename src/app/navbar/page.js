"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";


export default function Navbar() {
  const context = useContext(UserContext);
  console.log(context);

 

  const handleLogout = async () => {
    try {



      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;

      if (response.status === 200) {
        toast.success(json.msg, {
          position: "top-right",
        });

        // context.setUser(undefined)


      }
    } catch (error) {
      console.error("logout not yet", error);
      toast.error("there is a problem");
    }
  };

  return (
    <div>
      <header className="bg-blue-800 shadow-lg ">
        <nav className="flex justify-start py-5 px-6 ">
          <div className="mr-4">
            <Link href="/">
              <h1 className="font-bold text-2xl text-slate-100">Fuzonmedia</h1>
            </Link>
          </div>
          {context.user && (
            <div className="mr-4">
              <Link href="/form">
                <button className=" rounded-md px-2 py-2 text-white hover:text-gray-400">
                  <b>Add Contact</b>
                </button>
              </Link>
            </div>
          )}
          <div className="ml-auto">
            <ul className="flex items-end gap-4">
              {!context.user ? (
                <>
                  <li>
                    <Link href="/register">
                      <button className="rounded-md px-2 py-2 text-white hover:text-gray-400">
                        <b>Sign Up</b>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <button className="bg-green-700 hover:bg-green-800 rounded-md px-2 py-2 text-white">
                        <b>sign in</b>
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-800 rounded-md px-2 py-2 text-white"
                  >
                    <b>Log Out</b>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
