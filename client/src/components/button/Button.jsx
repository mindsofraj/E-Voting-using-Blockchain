import "./button.css";
import { motion } from "framer-motion";
export default function Button({ value }) {
  return (
    <div>
      <motion.button whileTap={{ scale: 0.9 }} id="btn" type="submit">
        {value}
      </motion.button>
    </div>
  );
}
