# Ekaara Designs - 10x Vision Generator

A premium, AI-powered interior design consultation tool featuring a buttery-smooth animated interface built with React, TypeScript, Framer Motion, and Tailwind CSS.

## 🌟 Features

- **Interactive Vision Quiz**: Multi-step, visually-driven quiz with smooth animations
- **AI-Powered Concepts**: Gemini AI generates personalized design visions
- **Bento Moodboard**: Dynamic grid layout with staggered animations
- **Consultation Drawer**: Elegant slide-in form for lead capture
- **Luxury Design**: Premium UI with Playfair Display typography and custom color palette

## 🎨 Design System

### Color Palette
- **Ivory**: #F8F5F0 (Background)
- **Charcoal**: #2B2B2B (Text)
- **Brass**: #B8965F (Primary accent)
- **Emerald**: #004D40 (Secondary accent)

### Typography
- **Serif**: Playfair Display (Headings)
- **Sans**: Montserrat (UI elements)
- **Body**: Open Sans (Body text)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
vision-generator-app/
├── src/
│   ├── components/
│   │   ├── VisionStepper.tsx       # Multi-step quiz component
│   │   ├── CraftingLoader.tsx      # Loading state with animations
│   │   ├── BentoMoodboard.tsx      # Results display (Bento grid)
│   │   └── ConsultationDrawer.tsx  # Lead capture form
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── constants/
│   │   └── quizOptions.ts          # Quiz data and options
│   ├── App.tsx                     # Main app logic & API integration
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🎯 Component Overview

### VisionStepper
- 3-step animated quiz
- Visual card selectors for project type and aesthetic
- Tag selectors for key feelings/materials
- Smooth slide transitions with Framer Motion

### CraftingLoader
- Full-screen elegant loading state
- Animated compass SVG drawing animation
- Rotating dots and transitioning text

### BentoMoodboard
- CSS Grid Bento layout (4 boxes)
- Staggered entry animations
- Interactive color palette with hover tooltips
- Key elements with Lucide icons
- CTA box with animated background

### ConsultationDrawer
- Slide-in drawer from right
- Form validation and submission
- Success state with checkmark animation
- Auto-close after submission

## 🤖 AI Integration

The app uses **Gemini 2.5 Flash Preview** with:
- Custom system instruction for luxury design voice
- JSON schema for structured responses
- Generates: concept name, vision statement, key elements, color palette

## 🎬 Animations

All animations use **Framer Motion** for:
- Page transitions (slide in/out)
- Staggered children (Bento grid)
- Hover/tap interactions
- Loading states
- Form feedback

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly interactions
- Adaptive layouts

## 🔧 Configuration

### Tailwind
Custom theme extends with:
- Ekaara color palette
- Custom fonts
- Animation utilities

### TypeScript
Strict mode enabled with:
- Full type coverage
- Interface-driven development
- No implicit any

## 📄 License

Private project for Ekaara Designs.

## 🙏 Credits

- **Design**: Inspired by luxury interior design firms
- **Images**: Unsplash (placeholder images)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI**: Google Gemini
