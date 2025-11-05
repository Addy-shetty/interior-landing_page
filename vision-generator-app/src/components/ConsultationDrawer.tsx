import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import type { ConsultationFormData } from '../types';

interface ConsultationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ConsultationFormData) => void;
}

export default function ConsultationDrawer({ isOpen, onClose, onSubmit }: ConsultationDrawerProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    email: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(formData);
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Close drawer after success message
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-ivory shadow-2xl z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-ivory border-b border-charcoal/10 p-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-3xl text-charcoal">Schedule Consultation</h2>
                <p className="font-sans text-charcoal/60 text-sm mt-1">
                  Let's bring your vision to life
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-charcoal/60 hover:text-charcoal transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block font-sans text-sm font-medium text-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-charcoal/10 rounded-lg focus:border-brass focus:outline-none transition-colors font-sans text-charcoal"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block font-sans text-sm font-medium text-charcoal mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-charcoal/10 rounded-lg focus:border-brass focus:outline-none transition-colors font-sans text-charcoal"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block font-sans text-sm font-medium text-charcoal mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-charcoal/10 rounded-lg focus:border-brass focus:outline-none transition-colors font-sans text-charcoal"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-brass/10 border border-brass/20 rounded-lg p-4">
                    <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                      Our design consultant will reach out within 24 hours to schedule your personalized session.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-sans font-semibold text-lg flex items-center justify-center gap-3 transition-colors ${
                      isSubmitting
                        ? 'bg-charcoal/20 text-charcoal/40 cursor-not-allowed'
                        : 'bg-brass hover:bg-brass-dark text-ivory shadow-lg'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Schedule Consultation
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-emerald rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                  >
                    <svg
                      className="w-10 h-10 text-ivory"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="font-serif text-3xl text-charcoal mb-3">Thank You!</h3>
                  <p className="font-sans text-charcoal/70">
                    We'll be in touch very soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
