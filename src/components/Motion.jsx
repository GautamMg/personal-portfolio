import { motion } from 'framer-motion'

// Page-load staggered fade-up (v2 motion standard).
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function Stagger({ children, className = '', as = 'div' }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp className={className} variants={staggerParent} initial="hidden" animate="show">
      {children}
    </Comp>
  )
}

export function FadeUp({ children, className = '', as = 'div' }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp className={className} variants={fadeUpItem}>
      {children}
    </Comp>
  )
}

// Route-change transition wrapper.
export function MotionPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
