import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  id: number;
};

export default function MovieCard({
  title,
  poster,
  overview,
  release_date,
  id,
}: Props) {
  const base_url = "https://image.tmdb.org/t/p/original";

  function limitOverview(overview: string) {
    const LIMIT = 200;
    if (overview.length > LIMIT) {
      return overview.substring(0, LIMIT) + "...";
    } else {
      return overview;
    }
  }

  return (
    <>
      <Link href={`/movie?id=${id}`} className="flex flex-row justify-center">
        <div className="bg-[#282828] w-[300px] min-h-[500px] rounded mr-4 border-purple-400 border-[2px] hover:border-purple-600 hover:border-[2px] duration-300 max-lg:w-[50%] max-sm:w-[100%]">
          <Image
            src={base_url + poster}
            alt={title}
            width={1000}
            height={1000}
            style={{ width: "100%", height: "400px" }}
          />
          <h3 className="font-workSans font-bold text-xl text-white px-4 mt-4">
            {title}
          </h3>
          <p className="font-workSans font-normal text-lg text-white px-4 py-1">
            {release_date.length > 0 ? release_date : "No release date."}
          </p>
          <p className="font-workSans font-normal text-sm text-white px-4 py-3">
            {overview.length > 0
              ? limitOverview(overview)
              : "No overview available."}
          </p>
        </div>
      </Link>
    </>
  );
}
