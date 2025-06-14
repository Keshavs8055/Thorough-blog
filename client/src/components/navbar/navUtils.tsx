import { motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

// Logo component
// export const Logo = () => (
//   <motion.div
//     className="flex-shrink-0 flex items-center"
//     whileHover={{ scale: 1.05 }}
//     transition={{ type: "spring", stiffness: 400, damping: 10 }}
//   >
//     <Link
//       href="/"
//       className="flex items-center"
//     >
//       <span className="text-xl font-bold tracking-wide">THE PUBLIC BLOG</span>
//     </Link>
//   </motion.div>
// );
export const Logo = () => (
  <motion.div
    className="flex-shrink-0 flex items-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Link
      href="/"
      className="flex items-center no-underline hover:underline"
    >
      <span className="text-2xl font-serif font-extrabold tracking-widest uppercase text-black">
        The Public Blog
      </span>
    </Link>
  </motion.div>
);

interface INavItem {
  item: {
    name: string;
    href: string;
  };
  pathname: string;
  onClick?: () => void;
}
// Navigation item component
export const NavItem = ({ item, pathname, onClick = () => {} }: INavItem) => (
  <Link
    href={item.href}
    onClick={onClick}
    className="no-underline hover:underline"
  >
    <motion.div
      className={`px-4 py-2 text-sm font-serif uppercase tracking-wide border-b-2 transition-all duration-200 ${
        pathname === item.href
          ? "text-black border-black"
          : "text-gray-600 border-transparent hover:text-black hover:border-gray-500"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      {item.name}
    </motion.div>
  </Link>
);

interface IButton {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

// Button components
export const MenuButton = ({ setIsOpen }: IButton) => (
  <motion.button
    onClick={() => setIsOpen(true)}
    className="p-2 rounded-md text-gray-600 hover:text-black focus:outline-none"
    whileTap={{ scale: 0.9 }}
    aria-label="Open menu"
  >
    <Menu size={24} />
  </motion.button>
);

export const CloseButton = ({ setIsOpen }: IButton) => (
  <motion.button
    onClick={() => setIsOpen(false)}
    className="p-2 rounded-md text-gray-500 hover:text-black"
    whileTap={{ scale: 0.9 }}
  >
    <X size={24} />
  </motion.button>
);

export const SearchButton = () => (
  <motion.button
    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-black rounded-md flex items-center hover:bg-gray-50"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label="Search"
  >
    <Search size={20} />
  </motion.button>
);
