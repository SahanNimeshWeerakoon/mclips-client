"use client";
import Search from "@/components/search/search";
import { Videos } from "@/components/video/Videos";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { user } = useUser();
  const { data: downloadCount, mutate } = useSWR(
    "/api/downloads",
    fetcher
  );

  const handleDownload = async () => {
    await fetch("/api/download/increment", { method: "POST" });
    mutate();
  };

  if (!user && downloadCount >= 10) {
    return <div>Please log in to download more videos.</div>;
  }

  if (user && downloadCount >= 20) {
    return <div>Please upgrade to a paid plan to download more videos.</div>;
  }

  return (
    <section className="mx-auto py-10 px-10">
      <Search />
      <Videos />
      <ul>
        <li>
          Video 1 <button onClick={handleDownload}>Download</button>
        </li>
        <li>
          Video 2 <button onClick={handleDownload}>Download</button>
        </li>
        <li>
          Video 3 <button onClick={handleDownload}>Download</button>
        </li>
      </ul>
    </section>
  );
}
