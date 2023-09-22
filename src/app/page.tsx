"use client";

import { useEffect, useState } from "react";
// import { useRouter, redirect } from "next/navigation";
import { useRouter } from "next13-progressbar";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  function handleSearch(e: any) {
    setSearch(e.target.value);
  }

  function handleBtnSearch() {
    if (search.length > 0) {
      router.push(`/search?q=${search}`, { scroll: false });
    } else {
      document.querySelector("input")?.focus();
    }
  }

  return (
    <>
      <main className="flex flex-col bg-[#000]">
        <section className="flex flex-col justify-center items-center px-4 min-h-screen w-[80%] self-center justify-self-center">
          <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 font-workSans uppercase mb-6">
            Find Movies from Around the World.
          </h2>

          <div className="flex flex-row w-full">
            <input
              className="bg-[#282828] text-white font-workSans w-full px-8 py-4 rounded-l-lg outline-none focus:ring-2 focus:ring-[#a285ff] duration-300 mr-2"
              type="text"
              placeholder="Search for a movie..."
              required
              onChange={(e) => handleSearch(e)}
            />

            <button
              className="bg-purple-600 px-4 py-3 rounded-r-lg font-workSans text-white font-bold w-[10%] hover:bg-purple-500 active:bg-purple-700 duration-300"
              onClick={handleBtnSearch}
            >
              Search
            </button>
          </div>

          <div className="flex flex-row items-center mt-8 w-full">
            <p className="font-workSans font-bold text-white">Or search for:</p>

            <button
              className="bg-purple-600 px-3 py-2 font-workSans text-white font-medium rounded-full text-sm hover:bg-purple-500 active:bg-purple-700 duration-300 ml-4"
              onClick={() => router.push("/now")}
            >
              Now Playing Movies
            </button>

            <button
              className="bg-purple-600 px-3 py-2 font-workSans text-white font-medium rounded-full text-sm hover:bg-purple-500 active:bg-purple-700 duration-300 ml-4"
              onClick={() => router.push("/popular")}
            >
              Popular Movies
            </button>

            <button
              className="bg-purple-600 px-3 py-2 font-workSans text-white font-medium rounded-full text-sm hover:bg-purple-500 active:bg-purple-700 duration-300 ml-4"
              onClick={() => router.push("/top")}
            >
              Top Rated Movies
            </button>

            <button
              className="bg-purple-600 px-3 py-2 font-workSans text-white font-medium rounded-full text-sm hover:bg-purple-500 active:bg-purple-700 duration-300 ml-4"
              onClick={() => router.push("/upcoming")}
            >
              Upcoming Movies
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
