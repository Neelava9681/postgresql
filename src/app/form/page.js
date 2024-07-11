"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Form() {
  const [values, setValues] = useState({
    Contacts_book_Name: "",
    Email: "",
    Postal_Address: "",
    number: "",
  });

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const userId = localStorage.getItem("userid");
      // console.log("Retrieved userId:", userId);
      const response = await axios.post(
        "http://localhost:3000/api/auth/contactBook",
        {
          Contacts_book_Name: values.Contacts_book_Name,
          Email: values.Email,
          Postal_Address: values.Postal_Address,
          number: values.number,
        
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const json = response.data;
        console.log(json.msg);
        toast.success("contact added",{
          position:"top-right"
        })
        setValues({
          Contacts_book_Name: "",
          Email: "",
          Postal_Address: "",
          number: "",
        });
      } else if (response.status === 400) {
        console.log("Enter all credentials");
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Enter valid credentials");
    }
  };

  return (
    <main className="bg-black h-screen">
      <div className="grid grid-cols-12">
        <div className="border mt-8 border-blue-800 bg-blue-900 rounded-xl shadow-lg shadow-blue-800 col-span-6 col-start-4 py-4">
          <div className="flex justify-center mx-2">
            <h1 className="text-3xl text-white">Add Contact Details</h1>
          </div>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <div className="mt-4 mx-2">
                <label
                  htmlFor="Contacts_book_Name"
                  className="block text-sm font-medium text-white"
                >
                  Contact book Name:
                </label>

                <input
                  type="text"
                  className="w-full mb-2 px-2 rounded-md border border-slate-600"
                  id="Contacts_book_Name"
                  name="Contacts_book_Name"
                  value={values.Contacts_book_Name}
                  onChange={onChange}
                />
              </div>
              <div className="mx-2">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-white"
                >
                  Email:
                </label>

                <input
                  type="text"
                  className="w-full mb-2 px-2 rounded-md border border-slate-600"
                  id="Email"
                  name="Email"
                  value={values.Email}
                  onChange={onChange}
                />
              </div>
              <div className="mx-2">
                <label
                  htmlFor="Postal_Address"
                  className="block text-sm font-medium text-white"
                >
                  Postal Address:
                </label>

                <input
                  type="text"
                  className="w-full mb-2 px-2 rounded-md border border-slate-600"
                  id="Postal_Address"
                  name="Postal_Address"
                  value={values.Postal_Address}
                  onChange={onChange}
                />
              </div>
              <div className="mx-2">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-white"
                >
                  Number:
                </label>

                <input
                  type="number"
                  className="w-full mb-2 px-2 rounded-md border border-slate-600"
                  id="number"
                  name="number"
                  value={values.number}
                  onChange={onChange}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mx-2 p-1 rounded-md border border-slate-950 hover:bg-green-800 bg-green-600"
                >
                  Add Contact
                </button>
                <button
                  type="button"
                  className="mx-2 p-1 rounded-md border border-slate-950 hover:bg-red-900 bg-red-600"
                  onClick={() =>
                    setValues({
                      Contacts_book_Name: "",
                      Email: "",
                      Postal_Address: "",
                      number: "",
                    })
                  }
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
