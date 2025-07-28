"use client";

import { useLoading } from "@/utils/loading";
import { AnimatePresence } from "framer-motion";
import { Spinner } from "./spinner";

export default function Loading() {
  const { isLoading } = useLoading();
  return <AnimatePresence>{isLoading && <Spinner />}</AnimatePresence>;
}
