"use client";

import BackButton from "@/components/BackButton/BackButton";
import MovieCard from "@/components/MovieCard/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton/MovieCardSkeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Upcoming() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const router = useRouter();

  async function fetchData(page: number) {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.AUTH_KEY}`,
      },
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

  async function fetchPages() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.AUTH_KEY}`,
      },
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
          setTotalPages(response.total_pages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNext() {
    setLoading(true);
    setPage(page + 1);
    setData([]);
  }

  function handlePrevious() {
    setLoading(true);
    setPage(page - 1);
    setData([]);
  }

  useEffect(() => {
    setLoading(true);

    if (data.length === 0) {
      fetchData(page);
    }

    if (totalPages === 0) {
      fetchPages();
    }

    if (data.length > 0 && totalPages > 0) {
      setLoading(false);
    }
  }, [data, page, totalPages]);

  return (
    <>
      <main className="flex flex-col bg-[#000] min-h-screen px-4 py-4">
        <section className="mt-32">
          <BackButton />
          <p className="text-white text-4xl max-sm:text-2xl">Search For:</p>
          <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 font-workSans uppercase max-sm:text-5xl">
            Upcoming Movies
          </h2>
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
                  key={data[movie].original_title}
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

        {!loading && (
          <section className="flex flex-row justify-center items-center gap-x-3 w-[100%] mt-8 max-sm:flex-col max-sm:w-[100%]">
            {page > 1 && (
              <button
                className="bg-purple-600 px-4 py-3 rounded font-workSans text-white font-bold hover:bg-purple-500 active:bg-purple-700 duration-300 mb-4 max-sm:text-xs self-start w-[45%] max-sm:w-[100%]"
                onClick={handlePrevious}
              >
                {"< Previous"}
              </button>
            )}

            {page < totalPages && (
              <button
                className="bg-purple-600 px-4 py-3 rounded font-workSans text-white font-bold hover:bg-purple-500 active:bg-purple-700 duration-300 mb-4 max-sm:text-xs self-end w-[45%] max-sm:w-[100%]"
                onClick={handleNext}
              >
                {"Next >"}
              </button>
            )}
          </section>
        )}
      </main>
    </>
  );
}
