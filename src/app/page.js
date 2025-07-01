"use client";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

// スクロールアニメーションを実装する際の選択肢
// 1、 Intersection Obserber + CSSアニメーション（ or ライブラリ）
// 2、 従来のスクロールイベント + CSSアニメーション（ or ライブラリ）
// 3、 トリガー用のJSライブラリ + CSSアニメーション（ or ライブラリ）
// 4、 全てJSライブラリ Framer Motion

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="スクロールアニメーション"
        subTitle="下にスクロールしてアニメーションを確認してください"
      />
      {/* ここから下はアニメーションセクション */}
      <section>
        <div className="container max-w-4xl mx-auto mb-20 spase-y-20">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{
              opacity: 1,
              y: 50,
              transition: {
                type: "spring",
                bounce: 0.6,
                duration: 1.5,
              },
            }}
            className="anim__wrapper"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Fade In Up
              </h2>
              <p className="text-gray-600">
                下から上にフェードインするアニメーション
              </p>
            </div>
          </motion.div>
        </div>
        <div className="container max-w-4xl mx-auto mb-20 spase-y-20">
          <motion.div
            initial={{ opacity: 0, y: 200, x: 200 }}
            whileInView={{
              opacity: 1,
              y: 50,
              x: 0,
              transition: {
                type: "spring",
                bounce: 1,
                duration: 5,
              },
              bidirectional: true,
            }}
            className="anim__wrapper"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Fade In Up
              </h2>
              <p className="text-gray-600">
                下から上にフェードインするアニメーション
              </p>
            </div>
          </motion.div>
        </div>
        <div className="container max-w-4xl mx-auto mb-220 spase-y-20">
          <motion.div
            initial={{ opacity: 0, y: 200, x: 200 }}
            whileInView={{
              opacity: 1,
              y: 50,
              x: 0,
              transition: {
                type: "spring",
                bounce: 1,
                duration: 5,
              },
              bidirectional: true,
            }}
            className="anim__wrapper"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Fade In Up
              </h2>
              <p className="text-gray-600">
                下から上にフェードインするアニメーション
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ここまではアニメーションセクション */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ul>
          <li className="space-y-6">
            <Button className="bg-blue-500 hover:bg-blue-700">
              <Link href="/posts">投稿一覧</Link>
            </Button>
          </li>
          <li>
            <Button className="bg-blue-500 hover:bg-blue-700">
              <Link href="/animatecss">Animate CSS</Link>
            </Button>
          </li>
        </ul>
      </main>
    </div>
  );
}
