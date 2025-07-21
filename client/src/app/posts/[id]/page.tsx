// app/posts/[id]/page.tsx
import SinglePost from "@/components/Post/SinglePost";
import { fetchPostById } from "@/lib/api";
import { Metadata } from "next";
import Head from "next/head";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Post Details",
  description: "Read the blog",
};

export default async function PostPage(props: Props) {
  const { id } = await props.params;
  const response = await fetchPostById(id);

  // Check if the response was successful and has data
  if (!response.success || !response.data) {
    console.error("Failed to fetch post:", response.message);
    redirect("/");
  }

  // Now we know response.data exists and is a Post
  return (
    <>
      <Head>
        <title>{response.data.title} - Thorough</title>
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-10">
        <SinglePost post={response.data} />
      </main>
    </>
  );
}
