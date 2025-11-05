// Quiz Options & Constants

import type { VisualCard, TagOption } from '../types';

export const PROJECT_TYPES: VisualCard[] = [
  {
    id: 'residential',
    label: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    description: 'Homes & Apartments'
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    description: 'Hotels & Resorts'
  },
  {
    id: 'commercial',
    label: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'Offices & Workspaces'
  }
];

export const AESTHETICS: VisualCard[] = [
  {
    id: 'modern-minimal',
    label: 'Modern Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Clean lines, neutral tones'
  },
  {
    id: 'heritage-luxe',
    label: 'Heritage Luxe',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    description: 'Traditional opulence'
  },
  {
    id: 'contemporary-fusion',
    label: 'Contemporary Fusion',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    description: 'Modern meets tradition'
  }
];

export const KEY_FEELINGS: TagOption[] = [
  { id: 'warm-woods', label: 'Warm Woods' },
  { id: 'cool-stone', label: 'Cool Stone' },
  { id: 'plush-textiles', label: 'Plush Textiles' },
  { id: 'metallic-accents', label: 'Metallic Accents' },
  { id: 'natural-light', label: 'Natural Light' },
  { id: 'rich-colors', label: 'Rich Colors' },
  { id: 'earthy-tones', label: 'Earthy Tones' },
  { id: 'botanical-elements', label: 'Botanical Elements' }
];

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
export const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';
