"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import UserContext from "@/context/UserContext";

const ContactList = () => {
  const [contactList, setContactList] = useState([]);
  const [value, setValue] = useState("");
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const context = useContext(UserContext);

  const fetchContact = useCallback(async () => {
    try {
      const userId = context.user.id;
      const res = await axios.get(
        `http://localhost:3000/api/auth/user/${userId}/contactBook`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setContactList(res.data);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  }, [context.user]);

  const handleNext = () => {
    if (page < pageCount) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (context.user?.id) {
      fetchContact();
    }
  }, [context.user, fetchContact]);

  useEffect(() => {
    const pageDataCount = Math.ceil(contactList.length / 5);
    setPageCount(pageDataCount);

    const limit = 5;
    const skip = limit * (page - 1);
    const dataSkip = contactList.slice(skip, skip + limit);
    setPageData(dataSkip);
  }, [contactList, page]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-8 md:col-start-3">
        <div className="flex justify-center">
          <form className="flex shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 mt-4 mb-8 bg-white sm:max-w-md">
            <input
              value={value}
              type="text"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder:text-gray-400 text-black focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Name or Number"
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
          <button
            type="submit"
            className="bg-slate-400 hover:bg-slate-500 h-9 mt-4 mx-0.5 p-1"
          >
            Search
          </button>
        </div>

        <h1 className="text-xl flex justify-start text-center p-2 text-white mt-4 mb-4">
          Your Contacts: {contactList.length}
        </h1>
        {pageData.length > 0 ? (
          pageData
            .filter((item) => {
              return value.toLowerCase() === ""
                ? item
                : item.Contacts_book_Name.toLowerCase().includes(value) ||
                    item.number.includes(value);
            })
            .map((contact) => (
              <div key={contact.id}>
                <div className="bg-blue-900 shadow-lg mt-2 rounded-lg">
                  <div className="p-5">
                    <table className="min-w-full bg-blue-900 text-white">
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 border-b border-gray-600">
                            Contacts Book Name
                          </td>
                          <td className="py-2 px-4 border-b border-gray-600">
                            {contact.Contacts_book_Name}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b border-gray-600">
                            Email
                          </td>
                          <td className="py-2 px-4 text-sm border-b border-gray-600">
                            {contact.Email}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b border-gray-600">
                            Number
                          </td>
                          <td className="py-2 px-4  border-b border-gray-600">
                            {contact.number}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b border-gray-600">
                            Postal Address
                          </td>
                          <td className="py-2 px-4 border-b border-gray-600">
                            {contact.Postal_Address}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
        ) : (""
          // <div className="flex justify-center">
          //   <div role="status">
          //     <svg
          //       aria-hidden="true"
          //       className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          //       viewBox="0 0 100 101"
          //       fill="none"
          //       xmlns="http://www.w3.org/2000/svg"
          //     >
          //       <path
          //         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          //         fill="currentColor"
          //       />
          //       <path
          //         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          //         fill="currentFill"
          //       />
          //     </svg>
          //     <h1 className="text-xl text-white">Loading...</h1>
          //   </div>
          // </div>
        )}

        {pageData.length > 0 ? (
          <>
            <div className="flex justify-center mt-4 mb-4">
              <nav aria-label="Page navigation example flex ">
                <ul className="flex items-center -space-x-px h-10 text-base">
                  <li>
                    <a
                      onClick={handlePrevious}
                      className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-3 h-3 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleNext}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-3 h-3 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContactList;
