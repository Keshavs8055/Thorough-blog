import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { SmartLink } from "../common/smartLink";

export const Logo = () => (
  <motion.div
    className="flex-shrink-0 flex items-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <SmartLink
      href="/"
      className="flex flex-col items-center xl:items-baseline xl:flex-row no-underline hover:underline"
    >
      <span className="text-3xl font-serif font-extrabold tracking-widest uppercase text-[#3D2C1F]">
        Thorough
      </span>{" "}
      <span className="font-light text-sm ms-2 font-sans text-[#6E5D4E]">
        A Blog Application
      </span>
    </SmartLink>
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

export const NavItem = ({ item, pathname, onClick }: INavItem) => (
  <SmartLink
    href={item.href}
    onClick={onClick}
    className="no-underline"
  >
    <motion.div
      className={`px-4 py-2 text-sm font-sans uppercase tracking-wide transition-all duration-200 border-b-2 ${
        pathname === item.href
          ? "text-[#3D2C1F] border-[#8B735C]"
          : "text-[#3D2C1F] border-transparent hover:text-[#8B735C] hover:border-[#8B735C]"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
    >
      {item.name}
    </motion.div>
  </SmartLink>
);

interface IButton {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MenuButton = ({ setIsOpen }: IButton) => (
  <motion.button
    onClick={() => setIsOpen(true)}
    className="p-2 rounded-md text-[#6E5D4E] hover:text-[#3D2C1F] focus:outline-none"
    whileTap={{ scale: 0.92 }}
    aria-label="Open menu"
  >
    <Menu size={24} />
  </motion.button>
);

export const CloseButton = ({ setIsOpen }: IButton) => (
  <motion.button
    onClick={() => setIsOpen(false)}
    className="p-2 rounded-md text-[#6E5D4E] hover:text-[#3D2C1F] focus:outline-none"
    whileTap={{ scale: 0.92 }}
    aria-label="Close menu"
  >
    <X size={24} />
  </motion.button>
);
