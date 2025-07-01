import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ul>
          <li>
            <Button className="bg-blue-500 hover:bg-blue-700">
              <Link href="/posts">投稿一覧</Link>
            </Button>
          </li>
        </ul>
      </main>
    </div>
  );
}
