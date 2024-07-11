"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify"




export default function Login() {


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter()

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
    console.log(credentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
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
        toast.success("done",{
          position:"top-right"
        })
        const json = response.data;
        // localStorage.setItem("userEmail", credentials.email);
        // localStorage.setItem("authToken", json.token);
        // localStorage.setItem("userid", json.userId);
        // console.log(localStorage.getItem("authToken"));
        // console.log(localStorage.getItem("userid"));
        // console.log(localStorage.getItem("userEmail"));
        // alert("Login successful");
    
        setCredentials({
          email: "",
          password: "",
        });
        router.push("/")
  
      } else if (response.status === 404) {
        console.log("Enter valid credentials");
        // alert("Invalid credentials");
        toast.error("enter valid credentials",{
          position:"top-right"
        })
      }
    } catch (error) {
      console.error("User does not exist");
      // alert("Enter valid credentials");
      toast.error("enter valid credentials",{
        position:"top-right"
      })
    }
  };

  return (
 

    <div className="bg-black min-h-screen">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-blue-950 p-6 rounded-lg shadow-lg shadow-blue-800">
          <div className="flex justify-center items-center">
            <Image src={logo} alt="logo" height={200} width={190} />
          </div>
          <h1 className="text-2xl text-white mt-3 font-bold flex justify-center items-center">Log In</h1>
          <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <div className="mt-3">
              <label htmlFor="email" className="text-white font-semibold">Email</label>
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
            </div>
            <div className="flex justify-center items-center">
            <div className="mt-3">
              <label htmlFor="password"  className="text-white font-semibold">Password</label>
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
            </div>
            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="mr-2 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-2 rounded"
              >
                Submit
              </button>
              <Link href="/register">
                <button className=" underline text-red-800 font-bold py-2 px-2 rounded">
                  New user
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
