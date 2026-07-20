"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500); // 1.5sec
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex flex-col items-center
                       justify-center bg-white"
            exit={{
              opacity: 0,
              scale: 1.05, // subtle zoom out on exit
              transition: { duration: 0.5 },
            }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <main>{children}</main>
    </>
  );
}
