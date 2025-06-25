// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

const ModalBackdrop = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    />
  )
} 

export default ModalBackdrop