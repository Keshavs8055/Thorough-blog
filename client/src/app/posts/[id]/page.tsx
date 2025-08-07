// app/posts/[id]/page.tsx
"use client";
import { fetchPostById } from "@/lib/api";
import SinglePost from "@/components/Post/SinglePost";
import { redirect, useParams } from "next/navigation";
import { GetPostByIdResponse, IPost } from "@/utils/globalTypes"; // Adjust import path as needed
import { useEffect, useState } from "react";
import Loading from "@/components/common/loading";

export default function PostPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<IPost | null>(null);
  useEffect(() => {
    if (!params.id) {
      redirect("/");
    }
    const handleFetchPost = async () => {
      const response: GetPostByIdResponse = await fetchPostById(params.id);
      if (!response.success || !response.data) {
        redirect("/");
      }
      setData(response.data);
    };

    handleFetchPost();
  }, [params.id]);

  if (!data) return <Loading />;
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <SinglePost post={data} />
    </main>
  );
}
