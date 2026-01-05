# Villa 1855 Website

Next.js 14 website voor Villa 1855 evenementenlocatie in Tilburg.

## 🚀 Quick Start

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structuur

```
villa1855-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout met fonts
│   │   ├── page.tsx            # Homepage
│   │   ├── trouwen/           # Bruiloften pagina
│   │   ├── zakelijk/          # Zakelijke events
│   │   ├── popup-restaurant/  # Pop-up restaurant
│   │   ├── open-dagen/        # Open dagen
│   │   ├── locatie/           # Over de locatie
│   │   ├── portfolio/         # Cases & foto's
│   │   └── contact/           # Contact pagina
│   │
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, Intro, Services, USPs, Reviews, CTA
│   │   └── ui/                # Buttons, Cards, Forms, etc.
│   │
│   ├── data/
│   │   └── site.ts            # Contact info, navigatie, open dagen
│   │
│   ├── lib/                   # Utilities
│   │
│   └── styles/
│       └── globals.css        # Design system + Tailwind
│
├── public/
│   ├── images/                # Foto's en logo's
│   ├── fonts/                 # Custom fonts (indien nodig)
│   └── brochures/             # PDF brochures
│
├── tailwind.config.ts         # Tailwind + design system colors
├── next.config.js             # Next.js config
└── package.json
```

## 🎨 Design System

### Kleuren (Tailwind classes)

```
primary-darkest  #102B2A  → bg-primary-darkest, text-primary-darkest
primary-dark     #405656  → bg-primary-dark
primary          #6F8281  → bg-primary, text-primary
primary-light    #9FADAD  → bg-primary-light
primary-lighter  #CED8D8  → bg-primary-lighter
primary-lightest #E7ECEC  → bg-primary-lightest
accent           #B58C67  → bg-accent, text-accent
accent-hover     #9A7555  → hover:bg-accent-hover
offwhite         #F5F7F8  → bg-offwhite
```

### Typography

- **Headings:** `font-heading` (Lora)
- **Body:** `font-body` (Public Sans)

### Components

```jsx
// Buttons
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-outline">Outline</button>

// Label/Eyebrow
<span className="label">Label tekst</span>

// Cards
<div className="card p-8">Card content</div>

// Section padding
<section className="section-padding">...</section>

// Container
<div className="container-custom">...</div>
```

## 📄 Pagina's te bouwen

- [x] Homepage (/)
- [ ] Trouwen (/trouwen)
- [ ] Zakelijk (/zakelijk)
- [ ] Pop-up Restaurant (/popup-restaurant)
- [ ] Open Dagen (/open-dagen)
- [ ] De Locatie (/locatie)
- [ ] Portfolio (/portfolio)
- [ ] Contact (/contact)

## 🖼️ Benodigde Assets

Plaats in `/public/images/`:
- `logo-light.png` - Logo voor donkere achtergrond
- `logo-dark.png` - Logo voor lichte achtergrond
- `hero-home.jpg` - Homepage hero achtergrond
- `service-trouwen.jpg`
- `service-zakelijk.jpg`
- `service-popup.jpg`
- `usp-image.jpg`
- `cta-bg.jpg`

Plaats in `/public/brochures/`:
- `brochure-trouwen.pdf`
- `brochure-zakelijk.pdf`

## 🔗 Belangrijke Data

### Contact
- Adres: Noordstraat 36, 5038 EJ Tilburg
- Tel: 085-2736709
- Email: info@villa1855.nl

### Open Dagen 2026
- 31 januari
- 12 april
- 28 juni
- 27 september
- 22 november

### YouTube Videos
- Zakelijk: FYhpMGblwMo
- Algemeen: ko5JAY5v7-E
- Bruiloften: zWrWAQ3buKc

## 🚀 Deployment

```bash
# Build voor productie
npm run build

# Deploy naar Vercel
vercel
```

## 📝 TODO

1. [ ] Logo's toevoegen aan /public/images/
2. [ ] Foto's toevoegen
3. [ ] Pagina's bouwen
4. [ ] Formulieren implementeren
5. [ ] Deploy naar Vercel
6. [ ] DNS instellen voor villa1855.nl
