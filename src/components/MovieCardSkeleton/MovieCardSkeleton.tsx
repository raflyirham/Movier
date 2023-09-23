import React from "react";

export default function MovieCardSkeleton() {
  return (
    <div className="bg-[#282828] w-[300px] min-h-[500px] rounded mr-4 max-lg:w-[50%] max-sm:w-[100%]">
      <div className="w-[100%] h-[400px] bg-[#3f3f3f] animate-pulse"></div>
      <div className="px-4 mt-4 animate-pulse">
        <div className="w-[50%] h-[40px] bg-[#3f3f3f]"></div>
      </div>
      <div className="px-4 py-6 animate-pulse">
        <div className="w-[100%] h-[100px] bg-[#3f3f3f]"></div>
      </div>
    </div>
  );
}
