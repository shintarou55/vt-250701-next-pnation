"use client";
import React, { useEffect, useState } from "react";

// lucideのアイコンのインポート
import { Loader2, AlertCircle, Slice } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";

export default function PostsPage() {
  // 投稿情報100件
  // https://jsonplaceholder.typicode.com/posts
  // 全投稿データを保存する配列（初期値は空配列）
  const [posts, setPosts] = useState([]); // 全投稿データを保存する配列（初期値は空配列）

  // Next.jsのフック　ページ遷移用
  const router = useRouter();

  // URLのクエリパラメーター(?pag=2など)を取得するフック
  const searchParams = useSearchParams();

  // ================= ページネーション設定 =================
  // URLから現在のページ番号を取得（クエリーがなければ（/posts/の状態）1ページ目を表示する）
  // searchParams.get("page")は文字列なので、Number()で数値に変換
  const currentPage = Number(searchParams.get("page")) || 1;
  // 1ページに表示する投稿数の設定
  const postsPerPage = 10;

  // ================= 表示する投稿の範囲を計算 =================
  // 表示開始位置のインデックスを計算
  // 例）：1ページ目なら（1-1）× 10 = 0, 2ページ目なら（2-1）× 10 = 10。
  const startIndex = (currentPage - 1) * postsPerPage;
  // 表示終了位置のインデックスを計算
  // 例）：1ページ目なら 0 + 10 = 10, 2ページ目なら 10 + 10 = 20
  const endIndex = startIndex + postsPerPage;
  // 全投稿から現在のページに表示する分だけを切り出し
  // slice(開始, 終了)で配列の一部を取得
  const currentPosts = posts.slice(startIndex, endIndex);

  // 総ページ数の計算
  // Math.ceil()で、小数点を切り上げ（例：10.1 → 11）
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    // 非同期でAPIからデータを取得する関数を定義
    const fetchPosts = async () => {
      try {
        const responswe = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await responswe.json();
        setPosts(data); // 取得したデータを配列postsに保存
      } catch (error) {
        // エラーハンドリング
      } finally {
        // 成功とか失敗に関わらず最後に実行される処理
        // ローディング状態を解除する処理（必要に応じて）
      }
    }; //関数はここまで

    // データ取得関数を実行
    fetchPosts();
  }, []); //依存配列が空なので、コンポーネントマウント時に一度だけ実行されます。

  const handlePageChange = (page) => {
    router.push(`/posts?page=${page}`);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            投稿一覧 (ページ {currentPage} / {totalPages})
          </CardTitle>
          <p>
            全 {posts.length} 件中 {startIndex + 1} -{" "}
            {Math.min(endIndex, posts.length)} 件を表示
            {/* Math.min(endIndex, posts.length)について、現在ページで表示している最後の投稿番号endIndexは、startIndexに10足しているだけなので、投稿数が101個だとstartIndexが101になり、endIndexは111になるので、そのまま扱うと間違いになる。
            posts.lengthは投稿数を表す数字になる。Math.min()で両方を入れておくと、どちらか小さい数字を採用する形になるので、こちの記述の方がどんな投稿数でも適切なエンドインデックスになる。 */}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentPosts.map((post) => (
              <Card key={post.id} className="p-0">
                <CardContent className="p-0">
                  {/* 投稿詳細ページへのリンク、現在のページ情報(リストページ)をクエリパラメーターに追加 */}
                  <Link
                    href={`/posts/${post.id}?from=posts&page=${currentPage}`}
                    className="block hover:bg-gray-50 hover:text-primary transition-colors p-4"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {post.id}. {post.title}
                    </h3>
                    <pre className="whitespace-pre-wrap">{post.body}</pre>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* 以下、ページネーション UI */}
          <div className="paging__wrapper flex flex-col items-center space-y-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {/* 前へのボタン */}
                  <PaginationPrevious
                    // 1ページ目でなければ前のページのURL、1ページ目なら無効化
                    href={
                      currentPage > 1 ? `/posts?page=${currentPage - 1}` : "#"
                    }
                  />
                </PaginationItem>
                {/* 以下、ページ番号ボタン */}
                {/* 総ページ数分のボタンを生成 */}
                {Array.from({ length: totalPages }).map((_, index) => {
                  // インデックス(0kら始まる)をページ番号(1から始まる)に変換
                  const pageNumber = index + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href={`/posts?page=${pageNumber}`}
                        isActive={pageNumber === currentPage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                {/* 以上、ページ番号ボタン */}
                {/* 次へのボタン */}
                <PaginationItem>
                  <PaginationNext
                    href={
                      currentPage < totalPages
                        ? `/posts?page=${currentPage + 1}`
                        : "#"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
              >
                最初のページ
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
              >
                最後のページ
              </Button>
            </div>
          </div>
          {/* ここまでページネーション UI paging__wrapper */}
        </CardContent>
      </Card>
    </div>
    // ここまで container
  );
}
