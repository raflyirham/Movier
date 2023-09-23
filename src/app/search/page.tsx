"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next13-progressbar";

import MovieCard from "@/components/MovieCard/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton/MovieCardSkeleton";
import BackButton from "@/components/BackButton/BackButton";
MovieCardSkeleton;

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  async function fetchData(name: string, page: number) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.AUTH_KEY}`,
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

  async function fetchPages(name: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;
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
      fetchData(search, page);
    }

    if (totalPages === 0 && !searchLoading) {
      fetchPages(search);
    }

    if (data.length > 0 && totalPages > 0) {
      setLoading(false);
    }
  }, [data, searchLoading, search, page, totalPages]);

  return (
    <>
      <main
        id="list"
        className="flex flex-col bg-[#000] min-h-screen px-4 py-4"
      >
        <section className="mt-32">
          <BackButton />
          {searchLoading || loading ? (
            <>
              <div className="bg-[#908d97] w-[200px] h-[40px] mb-3 animate-pulse max-sm:w-[150px] max-sm:h-[30px]"></div>
              <div className="bg-[#908d97] w-[500px] h-[80px] animate-pulse max-sm:w-[250px] max-sm:h-[50px]"></div>
            </>
          ) : (
            <>
              <p className="text-white text-4xl max-sm:text-2xl">Search For:</p>
              <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 font-workSans uppercase max-sm:text-5xl">
                {search}
              </h2>
            </>
          )}
        </section>

        <section className="flex flex-row justify-center flex-wrap gap-x-2 gap-y-7 mt-[80px] max-sm:gap-x-0">
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
