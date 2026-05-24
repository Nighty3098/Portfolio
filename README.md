# Nighty3098 Portfolio

Personal portfolio website for S.Artem (Nighty3098), built with React and TypeScript.

## About the project

Modern, responsive portfolio website showcasing the developer's skills and projects.

- **Home page** — greeting, about me, reviews, projects, contacts, footer
- **Customer reviews carousel** — auto-sliding review cards with dots navigation
- **Project cards** — interactive cards with image carousels and detail modals
- **GitHub stats modal** — fetches and displays aggregated GitHub profile stats (stars, repos, commits, PRs, issues, languages) with localStorage caching
- **Language switcher** — toggle between English and Russian via i18n context
- **GSAP split-screen animation** — welcome section with pinned scroll-triggered text reveal
- **Responsive design** — adapts to desktop, tablet and mobile

## Technologies

- **React 19** — framework
- **TypeScript** — type safety
- **Framer Motion 12** — animations
- **GSAP 3** — scroll-triggered animations (ScrollTrigger)
- **React Router DOM 7** — routing (HashRouter)
- **CSS3** — styling
- **Vercel Analytics & Speed Insights** — monitoring

## Project structure

```
src/
├── api/
│   └── github.ts              # GitHub API client with caching
├── components/
│   ├── welcome.tsx             # Welcome section (GSAP split-screen, nav)
│   ├── aboutme.tsx             # About section
│   ├── projects.tsx            # Main project grid
│   ├── project_card.tsx        # Project card with carousel & modal
│   ├── reviews.tsx             # Customer reviews carousel
│   ├── review_card.tsx         # Single review card
│   ├── contacts.tsx            # Contact links
│   ├── footer.tsx              # Copyright footer
│   ├── github_stats.tsx        # GitHub stats modal
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
