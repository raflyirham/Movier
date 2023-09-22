"use client";

import MovieCard from "@/components/MovieCard/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton/MovieCardSkeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Top() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  async function fetchData() {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}}`,
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

  useEffect(() => {
    setLoading(true);

    if (data.length === 0) {
      fetchData();
    }

    setLoading(false);
  }, [data]);

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
          <p className="text-white text-4xl">Search For:</p>
          <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 font-workSans uppercase">
            Top Rated Movies
          </h2>
        </section>

        <section>
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
        </section>
      </main>
    </>
  );
}
