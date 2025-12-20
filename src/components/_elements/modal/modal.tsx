"use client";
import { ReactNode, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={styles.modalWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onClose}
          >
            <div className={styles.modalContent} onClick={handleContentClick}>
              {title && <h2 className={styles.title}>{title}</h2>}
              <div className={styles.body}>{children}</div>
              <button onClick={onClose} className={styles.closeButton}>
                &times;
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
