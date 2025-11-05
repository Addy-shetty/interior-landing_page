import { useState } from 'react';
import VisionStepper from './components/VisionStepper';
import CraftingLoader from './components/CraftingLoader';
import BentoMoodboard from './components/BentoMoodboard';
import ConsultationDrawer from './components/ConsultationDrawer';
import type { QuizState, AIVisionResponse, ConsultationFormData } from './types';
import { GEMINI_API_KEY, GEMINI_MODEL } from './constants/quizOptions';

type AppState = 'quiz' | 'loading' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('quiz');
  const [aiResponse, setAiResponse] = useState<AIVisionResponse | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const generateVision = async (quizData: QuizState) => {
    setAppState('loading');

    try {
      const systemInstruction = `You are an elite interior design consultant for "Ekaara Designs," a luxury Indian design firm. 
Your role is to translate client preferences into aspirational, sophisticated design concepts.

Key Guidelines:
- Use evocative, luxurious language
- Reference Indian design heritage (Mughal, Rajasthani, contemporary fusion)
- Suggest premium materials and finishes
- Create a cohesive, memorable concept with a poetic name
- Be specific and inspiring in your vision statement`;

      const prompt = `Create a bespoke interior design concept based on:
- Project Type: ${quizData.projectType}
- Aesthetic: ${quizData.aesthetic}
- Key Feelings/Materials: ${quizData.keyFeelings.join(', ')}

Generate a unique concept name, an inspiring vision statement, 4 key design elements, and a harmonious color palette.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            systemInstruction: {
              parts: [{
                text: systemInstruction
              }]
            },
            generationConfig: {
              temperature: 0.9,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
              responseMimeType: 'application/json',
              responseSchema: {
                type: 'object',
                properties: {
                  conceptName: {
                    type: 'string',
                    description: 'A poetic, memorable name for the design concept'
                  },
                  visionStatement: {
                    type: 'string',
                    description: 'An inspiring 2-3 sentence vision statement'
                  },
                  keyElements: {
                    type: 'array',
                    items: {
                      type: 'string'
                    },
                    description: 'Four specific design elements or features'
                  },
                  colorPalette: {
                    type: 'object',
                    properties: {
                      primary: { type: 'string', description: 'Primary color hex code' },
                      secondary: { type: 'string', description: 'Secondary color hex code' },
                      accent: { type: 'string', description: 'Accent color hex code' },
                      neutral: { type: 'string', description: 'Neutral color hex code' }
                    },
                    required: ['primary', 'secondary', 'accent', 'neutral']
                  }
                },
                required: ['conceptName', 'visionStatement', 'keyElements', 'colorPalette']
              }
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate vision');
      }

      const data = await response.json();
      const generatedContent = JSON.parse(
        data.candidates[0].content.parts[0].text
      ) as AIVisionResponse;

      setAiResponse(generatedContent);
      setAppState('results');
    } catch (error) {
      console.error('Error generating vision:', error);
      // Fallback to demo data
      setAiResponse({
        conceptName: 'The Jaipur Sundown',
        visionStatement: 'A contemporary homage to Rajasthani opulence, where warm terracotta meets cool marble, and traditional jaali screens cast dancing shadows in a modern sanctuary.',
        keyElements: [
          'Hand-carved jaali screens in brass and stone',
          'Luxe terracotta and marble flooring',
          'Jewel-toned textiles with block-print motifs',
          'Statement lighting inspired by palace lanterns'
        ],
        colorPalette: {
          primary: '#D4845C',
          secondary: '#F5E6D3',
          accent: '#8B4513',
          neutral: '#E8DCC4'
        }
      });
      setAppState('results');
    }
  };

  const handleConsultationSubmit = (formData: ConsultationFormData) => {
    console.log('Consultation form submitted:', formData);
    // Here you would typically send this to your backend/CRM
  };

  return (
    <div className="min-h-screen">
      {appState === 'quiz' && <VisionStepper onComplete={generateVision} />}
      {appState === 'loading' && <CraftingLoader />}
      {appState === 'results' && aiResponse && (
        <>
          <BentoMoodboard
            visionData={aiResponse}
            onScheduleConsultation={() => setIsDrawerOpen(true)}
          />
          <ConsultationDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onSubmit={handleConsultationSubmit}
          />
        </>
      )}
    </div>
  );
}

export default App;
