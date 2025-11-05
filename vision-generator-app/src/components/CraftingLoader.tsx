import { motion } from 'framer-motion';

export default function CraftingLoader() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center">
      {/* Animated SVG Icon */}
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Compass Circle */}
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          stroke="#B8965F"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{
            pathLength: { duration: 2, ease: 'easeInOut' },
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
          }}
        />
        
        {/* Compass Needle */}
        <motion.path
          d="M60 20 L60 100 M40 40 L80 80"
          stroke="#004D40"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: 'easeOut'
          }}
        />
        
        {/* Center Dot */}
        <motion.circle
          cx="60"
          cy="60"
          r="5"
          fill="#2B2B2B"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{
            duration: 0.6,
            delay: 1.5,
            ease: 'easeOut'
          }}
        />
      </motion.svg>

      {/* Loading Text */}
      <motion.h2
        className="font-serif text-4xl text-charcoal text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Crafting your bespoke vision...
      </motion.h2>

      {/* Animated Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-brass rounded-full"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        className="font-sans text-charcoal/60 mt-6 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Our AI is analyzing your preferences to create a personalized design concept
      </motion.p>
    </div>
  );
}
