# Project Architecture

## 📁 Folder Structure

```
src/
├── components/
│   ├── layout/              # Layout components
│   │   ├── Header/          # Navigation header
│   │   ├── Footer/          # Site footer
│   │   └── MainLayout/      # Main app layout with routing
│   │
│   ├── pages/               # Page components
│   │   ├── Home/            # Home page
│   │   └── Plants/          # Plants finder page
│   │
│   ├── sections/            # Reusable sections
│   │   ├── HeroSection/     # Hero banner
│   │   ├── BenefitsSection/ # Benefits grid
│   │   ├── FAQSection/      # FAQ accordion
│   │   └── PlantFinderSection/  # Plant search section
│   │
│   └── shared/              # Shared components
│       ├── PlantCard/       # Plant display card
│       ├── SliderControl/   # Filter slider
│       └── CareModal/       # Care details modal
│
├── hooks/                   # Custom React hooks
│   └── usePlantSearch.ts    # Plant API hook
│
├── services/                # API services
│   └── plantApi.ts          # Axios-based API client
│
├── types/                   # TypeScript definitions
│   └── plant.ts             # Plant data types
│
└── styles/                  # Global styles
    ├── variables.css        # Design tokens
    └── global.css          # Global CSS
```

## 🗺️ Routes

- **`/`** - Home page
  - Hero section
  - Benefits section
  - FAQ section

- **`/plants`** - Plants page
  - Plant finder with filters
  - Results grid
  - Care modals

## 🧩 Component Architecture

### Layout Components
- **MainLayout** - Wraps all pages with header/footer
- **Header** - Sticky navigation with active route highlighting
- **Footer** - Attribution and links

### Pages
- **Home** - Landing page with marketing sections
- **Plants** - Plant finder and search functionality

### Sections
- **HeroSection** - Hero banner with CTA
- **BenefitsSection** - Feature highlights
- **FAQSection** - Common questions
- **PlantFinderSection** - Interactive plant search

### Shared Components
- **PlantCard** - Displays individual plant info
- **SliderControl** - Custom filter slider
- **CareModal** - Plant care details popup

## 🔄 Data Flow

1. User interacts with filters in **PlantFinderSection**
2. Filters passed to **usePlantSearch** hook
3. Hook calls **plantApiService** (Axios)
4. Results displayed in **PlantCard** components
5. Clicking "Care Plan" opens **CareModal**

## 🛣️ Routing

Using **React Router v7**:
- `<BrowserRouter>` wraps the app
- `<Routes>` defines route structure
- `<MainLayout>` is parent route
- `<Home>` and `<Plants>` are nested routes
- `<Outlet>` in MainLayout renders active page

## 🎨 Styling Strategy

- **CSS Modules** - Component-scoped styles
- **CSS Variables** - Design tokens in `variables.css`
- **Co-location** - Each component has its own CSS file
- **BEM-like naming** - Clear, semantic class names

## 📦 Dependencies

- **react-router-dom** - Client-side routing
- **axios** - HTTP client for API calls
- **TypeScript** - Type safety
- **Vite** - Build tool
