import { AnimatePresence } from "framer-motion";
import { Dispatch, JSX, SetStateAction } from "react";
import { motion } from "framer-motion";
import { CloseButton, NavItem } from "./navUtils";
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
        className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl p-5 flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-xl">Menu</span>
            <CloseButton setIsOpen={setIsOpen} />
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

          <div className="mt-auto">
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs italic text-gray-500 mt-4">
                {`"The pen is mightier than the algorithm." — Anonymous Reader`}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
