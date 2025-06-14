export const Trending = () => {
  return (
    <section>
      <h2 className="text-md font-bold uppercase mb-3 border-b border-neutral-800 pb-1 tracking-wider">
        Trending
      </h2>
      <ul className="space-y-2 text-[0.95rem] leading-snug text-neutral-800 list-inside list-[circle] pl-3">
        <li className="hover:underline cursor-pointer decoration-dotted">
          How Public Blogs Are Changing Journalism
        </li>
        <li className="hover:underline cursor-pointer decoration-dotted">
          5 Ways Readers Are Shaping Content
        </li>
        <li className="hover:underline cursor-pointer decoration-dotted">
          The Return of Authentic Writing
        </li>
      </ul>
    </section>
  );
};
