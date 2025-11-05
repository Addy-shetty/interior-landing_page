import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { QuizState } from '../types';
import { PROJECT_TYPES, AESTHETICS, KEY_FEELINGS } from '../constants/quizOptions';

interface VisionStepperProps {
  onComplete: (quizData: QuizState) => void;
}

export default function VisionStepper({ onComplete }: VisionStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>({
    projectType: '',
    aesthetic: '',
    keyFeelings: []
  });

  const totalSteps = 3;

  const handleProjectTypeSelect = (typeId: string) => {
    setQuizState({ ...quizState, projectType: typeId });
    setTimeout(() => setCurrentStep(1), 300);
  };

  const handleAestheticSelect = (aestheticId: string) => {
    setQuizState({ ...quizState, aesthetic: aestheticId });
    setTimeout(() => setCurrentStep(2), 300);
  };

  const handleFeelingToggle = (feelingId: string) => {
    const feelings = quizState.keyFeelings.includes(feelingId)
      ? quizState.keyFeelings.filter(f => f !== feelingId)
      : [...quizState.keyFeelings, feelingId].slice(0, 2); // Max 2 selections
    
    setQuizState({ ...quizState, keyFeelings: feelings });
  };

  const handleGenerate = () => {
    if (quizState.keyFeelings.length > 0) {
      onComplete(quizState);
    }
  };

  const slideVariants = {
    enter: { x: 1000, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -1000, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6">
      {/* Step Indicator */}
      <div className="flex gap-2 mb-12">
        {[...Array(totalSteps)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full ${
              i <= currentStep ? 'bg-brass w-12' : 'bg-charcoal/20 w-8'
            }`}
            initial={false}
            animate={{
              width: i <= currentStep ? 48 : 32,
              backgroundColor: i <= currentStep ? '#B8965F' : 'rgba(43, 43, 43, 0.2)'
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Quiz Container */}
      <div className="w-full max-w-6xl relative h-[600px]">
        <AnimatePresence mode="wait">
          {/* Step 0: Project Type */}
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <h2 className="font-serif text-5xl text-charcoal mb-4 text-center">
                What space are you dreaming of?
              </h2>
              <p className="font-sans text-charcoal/70 mb-12 text-lg">
                Select the type of project
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {PROJECT_TYPES.map((type) => (
                  <motion.div
                    key={type.id}
                    onClick={() => handleProjectTypeSelect(type.id)}
                    className={`relative overflow-hidden rounded-lg cursor-pointer h-80 group ${
                      quizState.projectType === type.id ? 'ring-4 ring-brass' : ''
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={type.imageUrl}
                      alt={type.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex flex-col justify-end p-6">
                      <h3 className="font-serif text-3xl text-ivory mb-2">{type.label}</h3>
                      <p className="font-sans text-ivory/90">{type.description}</p>
                    </div>
                    {quizState.projectType === type.id && (
                      <motion.div
                        layoutId="selected-border"
                        className="absolute inset-0 border-4 border-brass rounded-lg pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Aesthetic */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <h2 className="font-serif text-5xl text-charcoal mb-4 text-center">
                Which aesthetic speaks to you?
              </h2>
              <p className="font-sans text-charcoal/70 mb-12 text-lg">
                Choose your design direction
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {AESTHETICS.map((aesthetic) => (
                  <motion.div
                    key={aesthetic.id}
                    onClick={() => handleAestheticSelect(aesthetic.id)}
                    className={`relative overflow-hidden rounded-lg cursor-pointer h-80 group ${
                      quizState.aesthetic === aesthetic.id ? 'ring-4 ring-brass' : ''
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={aesthetic.imageUrl}
                      alt={aesthetic.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex flex-col justify-end p-6">
                      <h3 className="font-serif text-3xl text-ivory mb-2">{aesthetic.label}</h3>
                      <p className="font-sans text-ivory/90">{aesthetic.description}</p>
                    </div>
                    {quizState.aesthetic === aesthetic.id && (
                      <motion.div
                        layoutId="selected-border"
                        className="absolute inset-0 border-4 border-brass rounded-lg pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Key Feelings */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <h2 className="font-serif text-5xl text-charcoal mb-4 text-center">
                What feeling are you drawn to?
              </h2>
              <p className="font-sans text-charcoal/70 mb-12 text-lg">
                Select up to two materials or elements
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mb-12">
                {KEY_FEELINGS.map((feeling) => {
                  const isSelected = quizState.keyFeelings.includes(feeling.id);
                  return (
                    <motion.button
                      key={feeling.id}
                      onClick={() => handleFeelingToggle(feeling.id)}
                      className={`px-8 py-4 rounded-full font-sans text-lg transition-all ${
                        isSelected
                          ? 'bg-brass text-ivory shadow-lg'
                          : 'bg-ivory border-2 border-charcoal/20 text-charcoal hover:border-brass'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        backgroundColor: isSelected ? '#B8965F' : '#F8F5F0',
                        color: isSelected ? '#F8F5F0' : '#2B2B2B'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {feeling.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={quizState.keyFeelings.length === 0}
                className={`px-12 py-5 rounded-lg font-sans text-xl font-semibold transition-all flex items-center gap-3 ${
                  quizState.keyFeelings.length > 0
                    ? 'bg-brass text-ivory hover:bg-brass-dark shadow-xl'
                    : 'bg-charcoal/20 text-charcoal/40 cursor-not-allowed'
                }`}
                whileHover={quizState.keyFeelings.length > 0 ? { scale: 1.05 } : {}}
                animate={quizState.keyFeelings.length > 0 ? { opacity: [0.9, 1, 0.9] } : {}}
                transition={{
                  opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                Generate My Vision
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
