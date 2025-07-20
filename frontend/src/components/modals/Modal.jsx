import { useState, forwardRef, useImperativeHandle } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'

const Modal = forwardRef(({ children, layoutId }, refs) => {
  const [isOpened, setIsOpened] = useState(false)

  const toggleOpened = () => {
    setIsOpened(!isOpened)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleOpened
    }
  })

  return (
    <>
    <AnimatePresence>
    {
      isOpened && (
        <>
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
  
        <motion.div
          layoutId={layoutId}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-1 flex flex-col justify-center items-center z-50 bg-black p-6 rounded-lg border-1 border-zinc-50/10 bg-opacity-[0.01] w-3xl"    
        >
          {children}
        </motion.div>
        </>
      )
    }
    </AnimatePresence>
    </>
  )
})

export default Modal