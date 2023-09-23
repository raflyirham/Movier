"use client";

import BackButton from "@/components/BackButton/BackButton";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { useState, useEffect } from "react";

export default function Movie() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  const base_url = "https://image.tmdb.org/t/p/original";

  async function fetchData(id: string) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
          setData(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setSearchLoading(true);

    const query = searchParams.get("id");

    if (query == null || query.length == 0) {
      router.push(`/`);
    } else {
      setSearch(query);
      setSearchLoading(false);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (data == null && !searchLoading) {
      fetchData(search);
    }
    if (data != null) {
      setLoading(false);
    }
  }, [data, searchLoading, search]);

  return (
    <>
      <main className="flex flex-col bg-[#000] min-h-screen px-4 py-4">
        <section className="mt-32">
          <BackButton />

          {searchLoading || loading ? (
            <>
              <div className="bg-[#908d97] w-[200px] h-[40px] mb-3 animate-pulse max-sm:w-[150px] max-sm:h-[30px]"></div>
              <div className="bg-[#908d97] w-[500px] h-[80px] animate-pulse max-sm:w-[250px] max-sm:h-[50px]"></div>
            </>
          ) : (
            <>
              <p className="text-white text-4xl max-sm:text-2xl">
                Movie Detail:
              </p>
              <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 font-workSans uppercase max-sm:text-5xl">
                {data.original_title}
              </h2>
            </>
          )}
        </section>

        <section className="mt-[80px]">
          {loading ? (
            <div className="flex flex-row bg-[#282828] w-full min-h-[400px] rounded mr-4 max-sm:flex-col">
              <div className="w-[20%] min-h-[400px] bg-[#3f3f3f] animate-pulse max-sm:w-[100%]"></div>
              <div className="flex flex-col p-4 w-full">
                <div className="w-[400px] h-[50px] bg-[#3f3f3f] animate-pulse mb-2 max-sm:w-[80%]"></div>

                <div className="w-[200px] h-[20px] bg-[#3f3f3f] animate-pulse mb-4"></div>

                <div className="w-full h-[100px] bg-[#3f3f3f] animate-pulse mb-4 max-sm:w-[80%]"></div>

                <div className="w-[400px] h-[50px] bg-[#3f3f3f] animate-pulse mb-2 max-sm:w-[80%]"></div>

                <div className="w-[400px] h-[50px] bg-[#3f3f3f] animate-pulse mb-2 max-sm:w-[80%]"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row bg-[#282828] w-full min-h-[400px] rounded mr-4 border-purple-400 border-[2px] hover:border-purple-600 hover:border-[2px] duration-300 max-sm:flex-col">
              <Image
                src={base_url + data?.poster_path}
                alt={data.original_title}
                width={1000}
                height={1000}
                // style={{ width: "20%", minHeight: "400px" }}
                className="w-[20%] min-h-[400px] max-sm:w-[100%] max-sm:h-[400px] max-sm:rounded-t"
              ></Image>
              <div className="flex flex-col p-4">
                <h2 className="font-workSans font-bold text-4xl text-white mb-2">
                  {data.original_title}
                </h2>
                <p className="font-workSans font-normal text-sm text-white mb-4">
                  Release Date: {data?.release_date}
                </p>
                <p className="font-workSans font-normal text-lg text-white mb-4">
                  {data.overview}
                </p>

                <h3 className="font-workSans font-semibold text-lg text-white mb-2">
                  Genres:
                </h3>
                <div className="flex flex-row flex-wrap gap-4">
                  {data.genres.map((index: any, genre: any) => (
                    <div
                      key={genre}
                      className="bg-purple-600 px-3 py-2 font-workSans text-white font-medium rounded-full text-sm hover:bg-purple-500 active:bg-purple-700 duration-300"
                    >
                      {data.genres[genre]?.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
