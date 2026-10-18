"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CardImage = ({ src, idx }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Image Card */}
      <div
        className="group rounded-lg overflow-hidden relative cursor-pointer"
        data-aos="fade-up"
        data-aos-duration={`${1000 + idx * 100}`}
        data-aos-once="true"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt="image-card"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute w-full h-full bg-black/40 top-0 opacity-0 group-hover:opacity-100 duration-300 ease-in-out"></div>
      </div>

     
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.img
              src={src}
              alt="zoomed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="rounded-xl shadow-2xl object-contain max-h-[90vh] w-auto max-w-sm lg:max-w-3xl"
            />

           
            <motion.button
              className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-gray-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CardImage;
