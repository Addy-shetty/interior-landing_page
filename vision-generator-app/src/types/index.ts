// TypeScript Interfaces for the Vision Generator

export interface QuizState {
  projectType: string;
  aesthetic: string;
  keyFeelings: string[];
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

export interface AIVisionResponse {
  conceptName: string;
  visionStatement: string;
  keyElements: string[];
  colorPalette: ColorPalette;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
}

export interface VisualCard {
  id: string;
  label: string;
  imageUrl: string;
  description: string;
}

export interface TagOption {
  id: string;
  label: string;
  icon?: string;
}
