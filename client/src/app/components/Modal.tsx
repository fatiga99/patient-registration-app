"use client";

import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant: "success" | "error";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, variant }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 w-[320px] text-center"
      >
        <h2
          className={`text-lg font-bold ${
            variant === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {title}
        </h2>
        <p className="text-gray-600 mt-2">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-[#9378FF] text-white rounded-lg hover:bg-[#7a5cff] transition"
          onClick={onClose}
        >
          OK
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
