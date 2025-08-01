// import { AnimatePresence } from "framer-motion";
// import { Dispatch, JSX, SetStateAction } from "react";
// import { motion } from "framer-motion";
// import { CloseButton, NavItem } from "./navUtils";
// import { Quote } from "../Sidebar/quote";
// import { SearchComponent } from "../Sidebar/searchComponent";
// // Mobile menu component
// interface MobileMenu {
//   isOpen: boolean;
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
//   navItems: {
//     name: string;
//     href: string;
//     icon: JSX.Element;
//   }[];
//   authNavItem: {
//     name: string;
//     href: string;
//     icon: JSX.Element;
//   };
//   pathname: string;
// }
// export const MobileMenu = ({
//   isOpen,
//   setIsOpen,
//   navItems,
//   authNavItem,
//   pathname,
// }: MobileMenu) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         className="fixed right-0 top-0 h-full w-90 bg-[#f9f6f1] shadow-xl p-5 flex flex-col border-l border-gray-300"
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-8">
//           <span className="font-bold text-xl font-serif uppercase text-black">
//             Menu
//           </span>
//           <CloseButton setIsOpen={setIsOpen} />
//         </div>
//         <div className="pt-2 mb-2">
//           <SearchComponent />
//         </div>
//         <div className="flex flex-col space-y-4">
//           {navItems.map((item) => (
//             <NavItem
//               key={item.name}
//               item={item}
//               pathname={pathname}
//               onClick={() => setIsOpen(false)}
//             />
//           ))}
//           <NavItem
//             item={authNavItem}
//             pathname={pathname}
//             onClick={() => setIsOpen(false)}
//           />
//         </div>

//         <div className="mt-auto pt-4 border-gray-300">
//           <Quote />
//         </div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );
import { AnimatePresence } from "framer-motion";
import { Dispatch, JSX, SetStateAction } from "react";
import { motion } from "framer-motion";
import { CloseButton, NavItem } from "./navUtils";
import { Quote } from "../Sidebar/quote";
import { SearchComponent } from "../Sidebar/searchComponent";

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
        className="fixed right-0 top-0 h-full w-80 bg-[#FFFBF5] shadow-xl p-6 flex flex-col border-l border-[#6E5D4E] z-50"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.span
            className="font-serif text-2xl tracking-wide text-[#3D2C1F] uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Menu
          </motion.span>
          <CloseButton setIsOpen={setIsOpen} />
        </div>

        <motion.div
          className="pt-2 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SearchComponent />
        </motion.div>

        <motion.div
          className="flex flex-col space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <NavItem
                item={item}
                pathname={pathname}
                onClick={() => setIsOpen(false)}
              />
            </motion.div>
          ))}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <NavItem
              item={authNavItem}
              pathname={pathname}
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-auto pt-6 border-t border-[#6E5D4E]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Quote />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
