import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard/postCard";

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <PostCard
          title="Democracy in Blogging"
          author="Jamal Reyes"
          date="2025-04-12"
          excerpt="What happens when readers and writers share control of a platform?"
          image="/newspaper.jpg"
          slug="democracy-in-blogging"
          tags={["Content", "Relevant"]}
        />
        <PostCard
          title="Democracy in Blogging"
          author="Jamal Reyes"
          date="2025-04-12"
          excerpt="What happens when readers and writers share control of a platform?"
          slug="democracy-in-blogging"
          tags={["Content", "Relevant"]}
        />
      </div>
    </Layout>
  );
}
