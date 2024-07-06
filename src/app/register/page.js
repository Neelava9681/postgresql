"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
    console.log(credentials);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.msg);
      }else {
        console.log("now working")
        console.log('Unexpected response status:', response.status);
        // Handle other status codes as needed
      }
    } catch (error) {
      console.error("user exits");

    }
  };

  return (
    <div className="bg-slate-600 min-h-screen">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-[#9CA3AF] p-6 rounded-lg">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" height={200} width={190} />
          </div>
          <h1 className="text-2xl font-bold">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                placeholder="Enter Your password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="mr-4 bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-2 rounded"
              >
                Submit
              </button>
              <Link href="/login">
                <button className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-2 rounded">
                  Already a user
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
