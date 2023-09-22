import { useRouter } from "next13-progressbar";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="bg-purple-600 px-4 py-3 rounded font-workSans text-white font-bold w-[10%] hover:bg-purple-500 active:bg-purple-700 duration-300 mb-4"
      onClick={router.back}
    >
      {"< Back"}
    </button>
  );
}
