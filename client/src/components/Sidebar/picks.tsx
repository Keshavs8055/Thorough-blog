export const EditorsPicks = () => {
  return (
    <section>
      <h2 className="text-md font-bold uppercase mb-3 border-b border-neutral-800 pb-1 tracking-wider">
        {`Editor's Picks`}
      </h2>
      <ul className="space-y-2 text-[0.95rem] leading-snug text-neutral-800 list-inside list-[circle] pl-3">
        <li className="hover:underline cursor-pointer decoration-dotted">
          Letters From the Internet Underground
        </li>
        <li className="hover:underline cursor-pointer decoration-dotted">
          Who Controls the Feed?
        </li>
        <li className="hover:underline cursor-pointer decoration-dotted">
          Writers vs. Algorithms
        </li>
      </ul>
    </section>
  );
};
