import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

// フォルダ名[id]により、動的ルーティングが有効になる
// 例） /posts/1、posts/2 などのURLに対応
export default async function PostDetailPage({ params }) {
  // URLパラメータから投稿IDを取得
  const { id } = await params;
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
          <Link href="/posts">
            <ArrowLeft className="mr-2 w-4 h-4" />
            投稿一覧に戻る
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
