import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

// フォルダ名[id]により、動的ルーティングが有効になる
// 例） /posts/1、posts/2 などのURLに対応
export default async function PostDetailPage({ params, searchParams }) {
  // URLパラメータから投稿IDを取得
  const { id } = await params;
  const resolvedSeachParams = await searchParams;

  // URL例 /posts/11?from=posts&page=2
  // searchParams = {
  // from: 'posts',
  // page: '2'
  // } こんな感じでオブフェクトとしてデータをとりたい。

  const fromPage = resolvedSeachParams?.from || "posts";
  const pageNumber = resolvedSeachParams?.page || "1";
  // ? は オプショナルチェーニング。オブジェクトが"null"や"undifined"の場合でもエラーを起こさず安全にプロパティにアクセスできる機能

  // 戻り先URLを構築
  console.dir(resolvedSeachParams);
  const backUrl =
    fromPage === "posts" && pageNumber !== "1"
      ? `/posts?page=${pageNumber}`
      : `/posts`;

  let post = null;
  try {
    const responswe = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    post = await responswe.json();
  } catch (error) {
  } finally {
  }
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="outline"
          className="bg-blue-500 hover:bg-blue-700 hover:text-white text-white"
          asChild
        >
          <Link href={backUrl}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            投稿一覧に戻る
            {pageNumber !== "1" && `(${pageNumber})ページ目`}
          </Link>
        </Button>
      </div>
      {/* 投稿用カード */}
      <Card>
        <CardHeader className="text-2xl">
          投稿 #{post.id}：{post.title}
        </CardHeader>
        <CardContent>
          <pre className="text-lg whitespace-pre-wrap">{post.body}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
