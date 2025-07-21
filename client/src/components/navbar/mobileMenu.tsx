import { AnimatePresence } from "framer-motion";
import { Dispatch, JSX, SetStateAction } from "react";
import { motion } from "framer-motion";
import { CloseButton, NavItem } from "./navUtils";
import { Quote } from "../Sidebar/quote";
import { SearchComponent } from "../Sidebar/searchComponent";
// Mobile menu component
interface MobileMenu {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  navItems: {
    name: string;
    href: string;
    icon: JSX.Element;
  }[];
  authNavItem: {
    name: string;
    href: string;
    icon: JSX.Element;
  };
  pathname: string;
}
export const MobileMenu = ({
  isOpen,
  setIsOpen,
  navItems,
  authNavItem,
  pathname,
}: MobileMenu) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed right-0 top-0 h-full w-90 bg-[#f9f6f1] shadow-xl p-5 flex flex-col border-l border-gray-300"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="font-bold text-xl font-serif uppercase text-black">
            Menu
          </span>
          <CloseButton setIsOpen={setIsOpen} />
        </div>
        <div className="pt-2 mb-2">
          <SearchComponent />
        </div>
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              pathname={pathname}
              onClick={() => setIsOpen(false)}
            />
          ))}
          <NavItem
            item={authNavItem}
            pathname={pathname}
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="mt-auto pt-4 border-gray-300">
          <Quote />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
