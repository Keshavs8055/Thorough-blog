import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export const Logo = () => (
  <motion.div
    className="flex-shrink-0 flex items-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Link
      href="/"
      className="flex flex-col items-center xl:items-baseline xl:flex-row no-underline hover:underline"
    >
      <span className="text-2xl font-serif font-extrabold tracking-widest uppercase text-black">
        Thorough
      </span>{" "}
      <span className="font-extralight ms-1 font-sans">A blog Application</span>
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
      className={`px-4 py-2 text-sm font-serif uppercase tracking-wide  transition-all duration-200 ${
        pathname === item.href
          ? "text-white bg-gray-700 rounded-xl"
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
