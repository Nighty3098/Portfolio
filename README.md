# Nighty3098 Portfolio

Personal portfolio website for S.Artem (Nighty3098), built with React and TypeScript.

## About the project

Typographic Brutalism — bold, editorial-style portfolio with oversized typography as the primary visual element.

- **Home page** — hero, about, reviews, projects, contacts, footer
- **Hero with glitch effect** — name rendered in Rubik Glitch font with layered CSS glitch animation
- **Customer reviews carousel** — auto-sliding review cards with dots navigation
- **Project cards** — interactive cards with image carousels and detail modals in a Bento grid layout
- **GitHub stats modal** — fetches and displays aggregated GitHub profile stats (stars, repos, commits, PRs, issues) plus a language progress bar
- **Pentesting page** — `/pentesting` route for offensive security toolkit projects
- **Responsive design** — adapts to desktop (2-column grid) and mobile (1 column)

## Design

- **Fonts**: Anton (headings), Rubik Glitch (hero), JetBrains Mono (body)
- **Colors**: Near-black `#0a0a0a` background, off-white text, red accent `#e11d48`
- **Animations**: Framer Motion for scroll reveals, CSS glitch on hero name, hover overlays on project cards

## Technologies

- **React 19** — framework
- **TypeScript** — type safety
- **Framer Motion 12** — animations
- **React Router DOM 7** — routing (HashRouter)
- **CSS3** — styling with CSS custom properties
- **Vercel Analytics & Speed Insights** — monitoring

## Project structure

```
src/
├── api/
│   └── github.ts              # GitHub API client with caching
├── components/
│   ├── welcome.tsx             # Hero section with glitch name & navigation
│   ├── aboutme.tsx             # About section
│   ├── projects.tsx            # Main project grid (Bento layout)
│   ├── project_card.tsx        # Project card with carousel & modal
│   ├── reviews.tsx             # Customer reviews carousel
│   ├── review_card.tsx         # Single review card
│   ├── contacts.tsx            # Contact links
│   ├── footer.tsx              # Copyright footer
│   ├── github_stats.tsx        # GitHub stats modal with language progress bar
│   └── cat.tsx                 # Decorative SVG cat
├── context/
│   └── I18nContext.tsx          # i18n provider (EN/RU)
├── locales/
│   ├── en.json                 # English translations
│   └── ru.json                 # Russian translations
├── pages/
│   └── He4vyL0v3.tsx           # Pentesting projects page
├── App.tsx                     # Root component with routing
├── App.css                     # Global styles
└── index.tsx                   # Entry point (I18nProvider wrapper)
```

## Running the project

### Prerequisites

- Node.js 16+
- npm or yarn

### Install and start

```bash
git clone https://github.com/Nighty3098/Portfolio.git
cd Portfolio
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

## Contacts

- **GitHub**: [Nighty3098](https://github.com/Nighty3098)
- **DevTo**: [nighty3098](https://dev.to/nighty3098)
