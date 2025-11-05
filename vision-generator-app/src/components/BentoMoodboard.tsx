import { motion } from 'framer-motion';
import { Feather, Shield, Gem, Sparkles, ArrowRight } from 'lucide-react';
import type { AIVisionResponse } from '../types';

interface BentoMoodboardProps {
  visionData: AIVisionResponse;
  onScheduleConsultation: () => void;
}

const iconMap: Record<string, any> = {
  feather: Feather,
  shield: Shield,
  gem: Gem,
  sparkles: Sparkles
};

export default function BentoMoodboard({ visionData, onScheduleConsultation }: BentoMoodboardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-ivory p-8 md:p-12">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={boxVariants} className="text-center mb-12">
          <h1 className="font-serif text-6xl text-charcoal mb-4">Your Bespoke Vision</h1>
          <p className="font-sans text-charcoal/70 text-lg">
            A personalized design concept crafted just for you
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
          {/* Box 1: Concept Name & Vision Statement (Large, 2x2) */}
          <motion.div
            variants={boxVariants}
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-brass to-brass-dark rounded-2xl p-8 md:p-12 text-ivory shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern)" />
              </svg>
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8" />
                  <span className="font-sans text-sm uppercase tracking-wider opacity-90">
                    Your Design Concept
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                  {visionData.conceptName}
                </h2>
                <p className="font-body text-lg md:text-xl leading-relaxed opacity-95">
                  {visionData.visionStatement}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Box 2: Color Palette (Long, 2x1) */}
          <motion.div
            variants={boxVariants}
            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-xl"
          >
            <h3 className="font-sans text-charcoal text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-brass rounded" />
              Color Palette
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(visionData.colorPalette).map(([name, hex]) => (
                <motion.div
                  key={name}
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-full aspect-square rounded-xl shadow-lg mb-3 relative overflow-hidden"
                    style={{ backgroundColor: hex }}
                  >
                    {/* Tooltip on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-charcoal/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    >
                      <span className="text-ivory font-sans text-xs font-medium px-2 text-center">
                        {hex}
                      </span>
                    </motion.div>
                  </div>
                  <p className="font-sans text-xs text-charcoal/70 text-center capitalize">
                    {name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Box 3: Key Elements (Medium, 1x1) */}
          <motion.div
            variants={boxVariants}
            className="md:col-span-1 bg-emerald/5 border-2 border-emerald/20 rounded-2xl p-8 shadow-lg"
          >
            <h3 className="font-sans text-charcoal text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald rounded" />
              Key Elements
            </h3>
            <div className="space-y-4">
              {visionData.keyElements.map((element, index) => {
                const Icon = iconMap[['feather', 'shield', 'gem', 'sparkles'][index % 4]];
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Icon className="w-5 h-5 text-emerald mt-1 flex-shrink-0" />
                    <p className="font-body text-charcoal/80 text-sm leading-relaxed">
                      {element}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Box 4: Call to Action (Medium, 1x1) */}
          <motion.div
            variants={boxVariants}
            className="md:col-span-1 bg-charcoal rounded-2xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-brass/20 to-transparent"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            <div className="relative z-10">
              <h3 className="font-serif text-2xl text-ivory mb-4">
                Your Vision Awaits
              </h3>
              <p className="font-sans text-ivory/80 text-sm mb-6 leading-relaxed">
                Let's bring this concept to life together. Schedule a personalized consultation.
              </p>
              <motion.button
                onClick={onScheduleConsultation}
                className="w-full bg-brass hover:bg-brass-dark text-ivory font-sans font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Schedule My Consultation
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
