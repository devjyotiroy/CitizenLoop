import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/404.png";

export default function NotFound() {
  return (
    <div style={styles.wrapper}>
      {/* Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={styles.container}
      >
        <img
          src={notFoundImage}
          alt="Page Not Found"
          style={styles.image}
          draggable={false}
        />
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" style={styles.button}>
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    background: "#f8fafc",
  },

  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    maxWidth: "640px",
    height: "auto",
    pointerEvents: "none",
  }
};
