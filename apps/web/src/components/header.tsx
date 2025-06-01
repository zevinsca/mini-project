"use client";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from "next/link";
import Image from "next/image";
import LogOut from "./logout";

// interface Category {
//   objectId: string;
//   name: string;
// }

interface CurrentUser {
  id: string;
  firstName: string;
  username: string;
  email: string;
  role: string;
}
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState<CurrentUser | null>(null);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/user/current-user",
          { credentials: "include" }
        );
        const data = await res.json();
        setCurrentData(data.data);
        console.log(data);
        console.log(currentData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    getCurrentUser();
  });

  return (
    <header className="">
      {/* Desktop Navigation */}
      <nav className="md:block hidden pt-2 pb-5 font-lato fixed left-0 right-0 top-0 bg-white z-50 shadow-lg">
        <div className="flex justify-between items-center px-20">
          <div className="relative w-36 h-20">
            <Link href="/">
              <Image
                fill
                src="/logo/gas-tiket-logo.png"
                alt="Gas Tiket Logo"
                className="object-contain"
              />
            </Link>
          </div>
          <ul className="flex gap-10">
            <li>
              <Link href="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className="font-lato">
                Events
              </Link>
            </li>

            <li>
              <Link href="/about">About</Link>
            </li>

            {currentData ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  {currentData.email}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                    <ul className="text-sm text-gray-700">
                      <li>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <LogOut />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <nav>
                  <ul className="flex gap-10">
                    <li>
                      <Link href="/auth/login">Login</Link>
                    </li>
                    <li>
                      <Link href="/auth/register">Register</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="block md:hidden py-3 fixed left-0 right-0 top-0 bg-white z-50 shadow-md">
        <div className="px-5 flex justify-between items-center relative">
          <div className="relative w-36 h-20">
            <Link href="/">
              <Image
                fill
                src="/logo/gas-tiket-logo.png"
                alt="Gas Tiket Logo"
                className="object-contain"
              />
            </Link>
          </div>
          <button className="flex sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoClose /> : <RxHamburgerMenu />}
          </button>

          {isOpen && (
            <ul className="flex flex-col border-t border-white absolute left-0 top-full w-full bg-white z-40 px-5 pb-10 gap-5 text-center mt-3 shadow-md">
              <li>
                <Link href="/" className="">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              {currentData ? (
                <div className="flex flex-col gap-5">
                  <p>{currentData.email} </p>
                  <LogOut />
                </div>
              ) : (
                <div>
                  <nav>
                    <ul className="flex flex-col gap-5">
                      <li>
                        <Link href="/auth/login">Login</Link>
                      </li>
                      <li>
                        <Link href="/auth/register">Register</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
