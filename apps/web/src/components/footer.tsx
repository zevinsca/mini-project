import Link from "next/link";
import Image from "next/image";
// interface Category {
//   objectId: string;
//   name: string;
// }
import { FaInstagram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default async function Footer() {
  //   const res = await fetch(
  //     "https://sacredreceipt-us.backendless.app/api/data/Categories",
  //     { cache: "no-store" } // or "force-cache" if you prefer caching
  //   );
  //   const categories: Category[] = await res.json();
  return (
    <footer className="">
      <div className="bg-[#F5F5F5]">
        <div className="container mx-auto lg:pt-5 pt-10 lg:pb-3 pb-16">
          <nav className="grid lg:grid-cols-4 items-start pb-16 gap-10 lg:px-0 px-5 pt-5">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative w-full h-20 mb-5 ">
                <Image
                  fill
                  src="/logo/gas-tiket-logo.png"
                  alt="Gas Tiket Logo"
                  className="object-contain"
                />
              </div>
              <p className="font-semibold lg:text-left text-center lg:px-0 px-10">
                Event Apapun, Tiketnya di GasTiket!
              </p>
            </div>

            <ul className="flex flex-col lg:items-start items-center gap-5 pt-5">
              <li>
                <Link href="/" className="font-lato">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="font-lato">
                  Events
                </Link>
              </li>

              {/* <li>
                <Link href="/about">About</Link>
              </li> */}
            </ul>
            {/* <ul className="flex flex-col pt-5 lg:items-start items-center">
              <p className="px-4 font-bold pb-3">CATEGORIES</p>
              {categories.map((category: Category) => (
                <li key={category.objectId}>
                  <Link
                    href={`/categories/${category.name.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul> */}
            <div className="pt-5 flex flex-col lg:items-start items-center">
              <p className="text-left font-semibold">REACH US!</p>
              <Link
                href="https://instagram.com/gastiket"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-3 pt-3"
              >
                <FaInstagram className=" text-2xl" />
                <p className="text-lg">gastiket</p>
              </Link>
              <Link
                href="mailto:gastiket@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-3 pt-3"
              >
                <IoIosMail className=" text-2xl" />
                <p className="text-lg">gastiket@gmail.com</p>
              </Link>
            </div>
          </nav>
          <p className="text-center">
            Copyright © 2025 GasTiket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
