import { motion } from 'framer-motion';

export const DndButton = ({ children, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-red-800 border-2 border-yellow-600 text-yellow-100 font-bold rounded-sm shadow-lg hover:bg-red-700 transition-colors"
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};