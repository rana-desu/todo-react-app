// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

const ModalBackdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
} 

export default ModalBackdrop