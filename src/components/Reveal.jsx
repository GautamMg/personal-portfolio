import { motion } from 'framer-motion'

// Scroll-triggered fade-up (v2 motion standard).
export default function Reveal({ children, as = 'div', className = '', delay = 0 }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </Comp>
  )
}
