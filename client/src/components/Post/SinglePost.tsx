// import { Post, RelatedArticle } from "@/utils/types";
// import Image from "next/image";
// import Link from "next/link";

// export default function SinglePost({ post }: { post: Post }) {
//   return (
//     <article
//       className="font-serif max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
//       style={{ fontFamily: "var(--font-serif)" }}
//     >
//       {/* Masthead-like Title */}+
//       <div className="mb-8 border-b pb-4">
//         <h1
//           className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-center"
//           style={{
//             fontFamily: "var(--font-heading)",
//             color: "var(--color-ink)",
//           }}
//         >
//           {post.title.toUpperCase()}
//         </h1>
//       </div>
//       {/* Byline */}
//       <div
//         className="text-sm italic text-center text-muted mb-6"
//         style={{ color: "var(--color-muted)" }}
//       >
//         By{" "}
//         <Link
//           href={`/authors/${post.author.username}`}
//           className="underline"
//           style={{ color: "var(--color-primary)" }}
//         >
//           {post.author.name}
//         </Link>{" "}
//         • {new Date(post.date).toLocaleDateString()}
//       </div>
//       {/* Lead Paragraph */}
//       <p
//         className="text-xl font-medium mb-6 leading-relaxed text-ink"
//         style={{
//           color: "var(--color-ink)",
//           fontWeight: "500",
//           lineHeight: "1.75",
//         }}
//       >
//         {post.summary}
//       </p>
//       {/* Article Body with Drop Cap and Columns */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         {post.body.map((paragraph: string, i: number) => (
//           <p
//             key={i}
//             className={`${
//               i === 0
//                 ? "first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:pr-2"
//                 : ""
//             } text-ink leading-relaxed`}
//             style={{ color: "var(--color-ink)", lineHeight: "1.6" }}
//           >
//             {paragraph}
//           </p>
//         ))}
//       </div>
//       {/* Pull Quotes */}
//       {post.pullQuotes && post.pullQuotes?.length > 0 && (
//         <blockquote
//           className="my-8 px-6 py-4 italic border-l-4 border-primary bg-sepia-light"
//           style={{
//             borderColor: "var(--color-primary)",
//             backgroundColor: "#f8f1e0", // A slightly lighter sepia
//           }}
//         >
//           <p
//             className="text-lg text-ink"
//             style={{ color: "var(--color-ink)" }}
//           >
//             “{post.pullQuotes[0]}”
//           </p>
//         </blockquote>
//       )}
//       {/* Images */}
//       {post.image && (
//         <figure className="my-6">
//           <Image
//             src={post.image.src}
//             alt={post.image.alt}
//             width={700}
//             height={100}
//             className="max-h-screen w-full object-cover rounded-md border"
//             style={{ borderColor: "var(--color-muted)" }}
//           />
//           {post.image.caption && (
//             <figcaption
//               className="text-sm italic text-center mt-2 text-muted"
//               style={{ color: "var(--color-muted)" }}
//             >
//               {post.image.caption}{" "}
//               {post.image.source && (
//                 <span className="text-xs">({post.image.source})</span>
//               )}
//             </figcaption>
//           )}
//         </figure>
//       )}
//       {/* Subheadings */}
//       {post.subheadings?.map((sub: string, i: number) => (
//         <h2
//           key={i}
//           className="text-2xl font-bold my-6 border-b pb-2 text-ink"
//           style={{
//             fontFamily: "var(--font-heading)",
//             color: "var(--color-ink)",
//             fontWeight: "bold",
//             borderBottomColor: "var(--color-muted)",
//           }}
//         >
//           {sub}
//         </h2>
//       ))}
//       <div className="border-t pt-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Related Articles */}
//         {post.relatedArticles && post.relatedArticles?.length > 0 && (
//           <div>
//             <h3
//               className="text-xl font-bold mb-4 text-ink"
//               style={{
//                 fontFamily: "var(--font-heading)",
//                 color: "var(--color-ink)",
//                 fontWeight: "bold",
//               }}
//             >
//               Related Articles
//             </h3>
//             <ul className="list-disc list-inside space-y-2">
//               {post.relatedArticles.map((rel: RelatedArticle, i: number) => (
//                 <li key={i}>
//                   <Link
//                     href={rel.href}
//                     className="hover:underline text-primary"
//                     style={{ color: "var(--color-primary)" }}
//                   >
//                     {rel.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Author Bio */}
//         {post.author?.bio && (
//           <div className="border-t pt-8 md:border-t-0">
//             <h3
//               className="text-xl font-bold mb-4 text-ink"
//               style={{
//                 fontFamily: "var(--font-heading)",
//                 color: "var(--color-ink)",
//                 fontWeight: "bold",
//               }}
//             >
//               About the Author
//             </h3>
//             <div className="flex items-center space-x-4">
//               {post.author.avatar && (
//                 <Image
//                   src={post.author.avatar}
//                   alt={post.author.name}
//                   width={64} // Assuming a 64px width
//                   height={64} // Assuming a 64px height
//                   className="w-16 h-16 rounded-full object-cover border"
//                   style={{ borderColor: "var(--color-muted)" }}
//                 />
//               )}
//               <div>
//                 <p
//                   className="font-bold text-ink"
//                   style={{ color: "var(--color-ink)", fontWeight: "bold" }}
//                 >
//                   {post.author.name}
//                 </p>
//                 <p
//                   className="text-sm italic text-muted"
//                   style={{ color: "var(--color-muted)" }}
//                 >
//                   {post.author.bio}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Call to Action */}
//       <div
//         className="mt-12 pt-8 border-t text-center text-sm italic text-muted"
//         style={{ color: "var(--color-muted)" }}
//       >
//         Share your thoughts below. Join the community and contribute your voice.
//       </div>
//       {/* Share Buttons */}
//       <div className="mt-6 flex justify-center space-x-4 text-sm">
//         <button
//           className="hover:underline text-primary"
//           style={{ color: "var(--color-primary)" }}
//         >
//           Share on Twitter
//         </button>
//         <button
//           className="hover:underline text-primary"
//           style={{ color: "var(--color-primary)" }}
//         >
//           Share on Facebook
//         </button>
//       </div>
//       {/* Comments Section Placeholder */}
//       <div className="mt-12 pt-8 border-t">
//         <h3
//           className="text-xl font-bold mb-4 text-ink"
//           style={{
//             fontFamily: "var(--font-heading)",
//             color: "var(--color-ink)",
//             fontWeight: "bold",
//           }}
//         >
//           Comments
//         </h3>
//         <p
//           className="text-sm italic text-muted"
//           style={{ color: "var(--color-muted)" }}
//         >
//           Comments coming soon...
//         </p>
//       </div>
//     </article>
//   );
// }

import { Post } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function SinglePost({ post }: { post: Post }) {
  return (
    <article
      className="font-serif max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {/* Title */}
      <div className="mb-8 border-b pb-4">
        <h1
          className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-center"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-ink)",
          }}
        >
          {post.title.toUpperCase()}
        </h1>
      </div>

      {/* Author and Date */}
      <div
        className="text-sm italic text-center mb-6"
        style={{ color: "var(--color-muted)" }}
      >
        By{" "}
        <Link
          href={`/authors/${post.author.username}`}
          className="underline"
          style={{ color: "var(--color-primary)" }}
        >
          {post.author.name}
        </Link>{" "}
        • {new Date(post.date).toLocaleDateString()}
      </div>

      {/* Summary */}
      <p
        className="text-xl font-medium mb-6 leading-relaxed"
        style={{ color: "var(--color-ink)", lineHeight: "1.75" }}
      >
        {post.summary}
      </p>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {post.body.map((paragraph, i) => (
          <p
            key={i}
            className={`leading-relaxed text-ink ${
              i === 0
                ? "first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:pr-2"
                : ""
            }`}
            style={{ color: "var(--color-ink)", lineHeight: "1.6" }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Pull Quote */}
      {post.pullQuotes && post.pullQuotes.length > 0 && (
        <blockquote
          className="my-8 px-6 py-4 italic border-l-4 bg-sepia-light"
          style={{
            borderColor: "var(--color-primary)",
            backgroundColor: "#f8f1e0",
          }}
        >
          <p
            className="text-lg"
            style={{ color: "var(--color-ink)" }}
          >
            “{post.pullQuotes[0]}”
          </p>
        </blockquote>
      )}

      {/* Featured Image */}
      {post.image && (
        <figure className="my-6">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={700}
            height={100}
            className="w-full max-h-screen object-cover rounded-md border"
            style={{ borderColor: "var(--color-muted)" }}
          />
          {post.image.caption && (
            <figcaption
              className="text-sm italic text-center mt-2"
              style={{ color: "var(--color-muted)" }}
            >
              {post.image.caption}{" "}
              {post.image.source && (
                <span className="text-xs">({post.image.source})</span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      {/* Subheadings */}
      {post.subheadings?.map((sub, i) => (
        <h2
          key={i}
          className="text-2xl font-bold my-6 border-b pb-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-ink)",
            borderBottomColor: "var(--color-muted)",
          }}
        >
          {sub}
        </h2>
      ))}

      {/* Related Articles & Author Info */}
      <div className="border-t pt-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {post.relatedArticles && post.relatedArticles?.length > 0 && (
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-ink)",
              }}
            >
              Related Articles
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {post.relatedArticles.map((rel, i) => (
                <li key={i}>
                  <Link
                    href={rel.href}
                    className="hover:underline"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {rel.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {post.author.bio && (
          <div className="border-t pt-8 md:border-t-0">
            <h3
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-ink)",
              }}
            >
              About the Author
            </h3>
            <div className="flex items-center space-x-4">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border"
                  style={{ borderColor: "var(--color-muted)" }}
                />
              )}
              <div>
                <p
                  className="font-bold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {post.author.name}
                </p>
                <p
                  className="text-sm italic"
                  style={{ color: "var(--color-muted)" }}
                >
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div
        className="mt-12 pt-8 border-t text-center text-sm italic"
        style={{ color: "var(--color-muted)" }}
      >
        Share your thoughts below. Join the community and contribute your voice.
      </div>

      {/* Share Buttons */}
      <div className="mt-6 flex justify-center space-x-4 text-sm">
        {["Twitter", "Facebook"].map((platform) => (
          <button
            key={platform}
            className="hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Share on {platform}
          </button>
        ))}
      </div>

      {/* Comments Placeholder */}
      <div className="mt-12 pt-8 border-t">
        <h3
          className="text-xl font-bold mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-ink)",
          }}
        >
          Comments
        </h3>
        <p
          className="text-sm italic"
          style={{ color: "var(--color-muted)" }}
        >
          Comments coming soon...
        </p>
      </div>
    </article>
  );
}
