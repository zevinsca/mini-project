"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";

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
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/user/current-user",
          { credentials: "include" }
        );
        const data = await res.json();
        setCurrentData(data.data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    }

    getCurrentUser();
  }, []);

  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    setSearchQuery(searchParam);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/events?search=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push(`/events`);
    }
  };

  return (
    <header>
      {/* Desktop Navigation */}
      <nav className="md:block hidden pt-2 pb-5 font-lato fixed left-0 right-0 top-0 bg-white z-50 shadow-lg">
        <div className="flex justify-between items-center px-20">
          {/* Logo */}
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

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 mx-8">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </form>

          {/* Menu Links */}
          <ul className="flex gap-10">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            {currentData ? (
              <div>
                <p>{currentData.firstName}</p>
              </div>
            ) : (
              <div>
                <ul className="flex gap-10">
                  <li>
                    <Link href="/auth/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Register</Link>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="block md:hidden py-3 fixed left-0 right-0 top-0 bg-white z-50 shadow-md">
        <div className="px-5 flex justify-between items-center relative">
          {/* Logo */}
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

          {/* Hamburger Menu */}
          <button className="flex sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoClose /> : <RxHamburgerMenu />}
          </button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <ul className="flex flex-col border-t border-white absolute left-0 top-full w-full bg-white z-40 px-5 pb-10 gap-5 text-center mt-3 shadow-md">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
              {/* Mobile Search */}
              <li>
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </form>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
