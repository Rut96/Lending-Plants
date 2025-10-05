# Pocket Garden Setup Guide

A beautiful, accessible single-page application for discovering the perfect houseplants based on your conditions and experience level.

## 🌿 Features

- **Interactive Plant Finder**: Filter plants by light conditions, time commitment, and experience level
- **Detailed Care Plans**: View watering, light, repotting, and pet safety information for each plant
- **Smooth Micro-interactions**: 3D card hover effects, scroll animations, and smooth transitions
- **Fully Accessible**: WCAG AA compliant with keyboard navigation and reduced motion support
- **SEO Optimized**: Includes meta tags, OpenGraph, and JSON-LD structured data
- **Responsive Design**: Works beautifully on all devices

## 🚀 Quick Start

### 1. Get Your API Key

1. Visit [Perenual API](https://perenual.com/docs/api)
2. Sign up for a free account
3. Copy your API key

### 2. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your API key to `.env`:

```
VITE_PERENUAL_API_KEY=your_api_key_here
```

### 3. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Color Palette

The application uses a soft, nature-inspired color palette:

```css
--color-leaf-600: #6B8E5E     /* Primary accent */
--color-moss-500: #8FAE8E     /* Secondary */
--color-cream-50: #F8F6EF     /* Background */
--color-clay-400: #C9B89A     /* Tertiary */
--color-charcoal-900: #2F3231 /* Text */
```

**Customizing Colors**: Edit `src/styles/variables.css` to change the color scheme.

### Typography

- **Headings**: Playfair Display (serif) - elegant and friendly
- **Body**: Inter (sans-serif) - clean and readable

To change fonts, update the `@import` statement in `src/styles/variables.css` and modify the font family variables.

## 🔧 Customization

### Filter Mappings

The Plant Finder maps user-friendly options to Perenual API parameters. Customize these in `src/hooks/usePlantSearch.ts`:

```typescript
const FILTER_MAPPINGS: FilterMappings = {
  light: {
    low: ['full_shade', 'part_shade'],
    medium: ['sun-part_shade', 'part_shade'],
    high: ['full_sun'],
  },
  time: {
    low: ['minimum', 'none'],
    medium: ['average'],
    high: ['frequent'],
  },
};
```

### Experience Level Logic

Experience filtering is handled client-side. Modify the `filterByExperience` function in `src/hooks/usePlantSearch.ts` to adjust criteria:

- **Beginner**: Easy watering (minimum/average/none) + no full sun requirement
- **Intermediate**: All plants (no filtering)
- **Expert**: Frequent watering or full sun requirements

### Microcopy & Tone

All content is in `src/pages/PocketGarden.tsx`. Update section text to match your brand voice:

- Hero headline & subtitle
- Benefits section (4 cards)
- FAQ section (3 questions)
- Footer attribution

## 📁 Project Structure

```
src/
├── components/
│   ├── PlantCard.tsx          # Individual plant card with 3D hover effect
│   ├── PlantFinder.tsx        # Main finder section with filters
│   ├── SliderControl.tsx      # Accessible slider control
│   └── CareModal.tsx          # Modal with care details & copy-to-clipboard
├── hooks/
│   └── usePlantSearch.ts      # React hook for plant search logic & debouncing
├── services/
│   └── plantApi.ts            # Axios-based API service layer
├── pages/
│   └── PocketGarden.tsx       # Main landing page
├── styles/
│   ├── variables.css          # Design tokens (colors, spacing, etc.)
│   └── global.css            # Global styles & utilities
└── types/
    └── plant.ts              # TypeScript interfaces for API data
```

## 🎯 API Integration

### Service Layer Architecture

The app uses **Axios** for all HTTP requests through a dedicated service layer:

**`src/services/plantApi.ts`** - Centralized API service:
- Singleton pattern with axios instance
- Automatic API key injection
- Request/response interceptors for error handling
- 10-second timeout for all requests

### Endpoints Used

1. **Species List**: `GET /api/v2/species-list`
   - Filters: `indoor=1`, `sunlight`, `watering`
   - Returns array of plant species
   - Called via `plantApiService.searchPlants()`

2. **Species Details**: `GET /api/v2/species/details/{id}`
   - Returns detailed care information for a specific plant
   - Cached in memory to reduce API calls
   - Called via `plantApiService.getPlantDetails(id)`

### Error Handling

The service layer provides comprehensive error handling:

- **Missing API key**: Throws descriptive error
- **Network errors**: "No response from server" message
- **API errors**: Formatted with status code and message
- **Axios interceptors**: Automatic error transformation
- **Client-side caching**: Reduces redundant API calls

## ♿ Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper labels for screen readers
- **Focus Management**: Clear focus indicators (2px outline)
- **Reduced Motion**: Animations disabled when `prefers-reduced-motion` is set
- **Color Contrast**: All text meets WCAG AA standards
- **Semantic HTML**: Proper heading hierarchy and landmark regions

## 🔍 SEO Implementation

### Meta Tags

Located in `index.html`:
- Primary meta tags (title, description)
- OpenGraph tags (Facebook)
- Twitter Card tags
- Theme color for browser UI

### JSON-LD Schema

Dynamically added in `PocketGarden.tsx`:
- WebSite schema with name, description, URL
- Helps search engines understand the site structure

## 🎭 Micro-interactions

### Card Hover Effect
- 3D tilt transformation with perspective
- Subtle lift on hover
- Disabled when reduced motion is preferred

```css
.plant-card:hover {
  transform: translateY(-4px) perspective(1000px) rotateX(2deg);
}
```

### Scroll Animations
- Fade-in with translateY on scroll
- Uses IntersectionObserver
- Automatically disabled for reduced motion

### Button Interactions
- Smooth color transitions
- Icon slide animations
- Box shadow changes

## 📱 Responsive Breakpoints

- **Desktop**: 1280px max-width container
- **Tablet**: 768px - adjusted grid layouts
- **Mobile**: 640px - single column, smaller typography

## 🐛 Troubleshooting

### "API key not configured" Error
- Ensure `.env` file exists in root directory
- Verify `VITE_PERENUAL_API_KEY` is set
- Restart dev server after adding `.env`

### No Plants Showing
- Check API key is valid
- Try different filter combinations
- Check browser console for API errors
- Verify network connectivity

### Styling Issues
- Clear browser cache
- Check `src/styles/global.css` is imported
- Verify CSS custom properties are supported in your browser

## 📄 License

This project uses the Perenual API. Please review their [terms of service](https://perenual.com/docs/api) and provide proper attribution when using plant data.

## 🙏 Attribution

- **Plant Data**: [Perenual API](https://perenual.com)
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Icons**: Custom SVG icons

---

Built with ❤️ using React, TypeScript, and Vite
