"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import MovieCard from "@/components/MovieCard/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton/MovieCardSkeleton";
MovieCardSkeleton;

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  async function fetchData(name: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}}`,
      },
      next: { revalidate: 0 },
    };

    fetch(url, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        if (response !== null) {
          setData(response.results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setSearchLoading(true);

    const query = searchParams.get("q");

    if (query == null || query.length == 0) {
      router.push(`/`);
    } else {
      setSearch(query);
      setSearchLoading(false);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (data.length == 0 && !searchLoading) {
      fetchData(search);
      setLoading(false);
    }
  }, [data, searchLoading, search]);

  return (
    <>
      <main className="flex flex-col bg-[#000] min-h-screen px-4 py-4">
        <section className="mt-32">
          <button
            className="bg-purple-600 px-4 py-3 rounded font-workSans text-white font-bold w-[10%] hover:bg-purple-500 active:bg-purple-700 duration-300 mb-4"
            onClick={router.back}
          >
            {"< Back"}
          </button>
          {searchLoading ? (
            <>
              <div className="bg-[#908d97] w-[200px] h-[40px] mb-3 animate-pulse"></div>
              <div className="bg-[#908d97] w-[500px] h-[80px] animate-pulse"></div>
            </>
          ) : (
            <>
              <p className="text-white text-4xl">Search For:</p>
              <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 font-workSans uppercase">
                {search}
              </h2>
            </>
          )}
        </section>

        <section className="flex flex-row justify-center flex-wrap gap-x-2 gap-y-7 mt-[80px]">
          {loading ? (
            <>
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
            </>
          ) : (
            <>
              {data.map((index, movie) => (
                <MovieCard
                  key={movie}
                  title={data[movie].original_title}
                  poster={data[movie].poster_path}
                  overview={data[movie].overview}
                  release_date={data[movie].release_date}
                  id={data[movie].id}
                />
              ))}
            </>
          )}
        </section>
      </main>
    </>
  );
}
