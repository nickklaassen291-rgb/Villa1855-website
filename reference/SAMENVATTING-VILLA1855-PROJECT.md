# Villa 1855 Website Project - Volledige Samenvatting

## Deel 1: Cookaholics Design System & Template Format

### Merkarchitectuur
We hebben een modulair design system opgezet voor het Cookaholics portfolio:

```
COOKAHOLICS (moedermerk)
├── Catering & Events
│
├── LOCATIES
│   ├── Villa 1855 (monumentale villa, Tilburg) ✅ Gebouwd
│   ├── [Kerk] (exclusieve eventlocatie, komt)
│   └── [Toekomstige locaties...]
│
├── FOOD CONCEPTS
│   ├── The Laughing Cat (Aziatisch streetfood)
│   ├── Pitt BBQ ✅ Template gebouwd
│   └── [Toekomstige concepts...]
│
└── PARTNERSHIPS
    ├── FC Den Bosch Businessclub (komt)
    └── [Toekomstige partnerships...]
```

### Template Structuur
Het design system werkt met **CSS variabelen** in `:root` die per merk worden aangepast:

```css
:root {
    /* PRIMARY COLORS - Pas per merk aan */
    --color-primary-darkest: #102B2A;
    --color-primary-dark: #405656;
    --color-primary: #6F8281;
    --color-primary-light: #9FADAD;
    --color-primary-lighter: #CED8D8;
    --color-primary-lightest: #E7ECEC;
    
    /* ACCENT COLOR */
    --color-accent: #B58C67;
    --color-accent-hover: #9A7555;
    
    /* TYPOGRAPHY */
    --font-heading: 'Lora', Georgia, serif;
    --font-body: 'Public Sans', sans-serif;
    
    /* EFFECTS */
    --border-radius: 0px;  /* 0 = klassiek, 8px = modern */
}
```

### Standaard Secties in Template
1. **Navigation** - Vast menu met logo en links
2. **Hero** - Grote header met titel, subtitel en CTA
3. **Video Section** - Fullwidth YouTube embed (Brandblocks-stijl)
4. **Intro/Stats** - Introductietekst met statistieken
5. **Services/Cards** - Diensten of aanbod cards
6. **Features/USP** - Unique selling points met afbeelding
7. **Configurator** - Interactieve prijs/arrangement calculator
8. **Reviews** - Klantervaringen
9. **FAQ** - Veelgestelde vragen (accordion)
10. **Gallery** - Foto galerij
11. **CTA** - Call-to-action blok
12. **Footer** - Contact, navigatie, socials + "Een Cookaholics locatie"
13. **Chat/Beschikbaarheid Widget** - Floating widget rechtsonder

---

## Deel 2: Wat We Hebben Gebouwd voor Villa 1855

### ✅ Voltooide Pagina's

#### 1. Homepage (villa1855.html)
- Hero sectie met "Sinds 1855" badge
- Intro over de locatie
- 3 diensten cards (Bruiloften, Zakelijk, Bijzondere Vieringen)
- USP's sectie
- Sfeerimpressie galerij
- CTA sectie
- Complete footer met socials

**Locatie:** `/home/claude/cookaholics-design-system/villa1855.html`

#### 2. Bruiloften Pagina (villa1855-bruiloften.html)
- Page hero specifiek voor bruiloften
- Intro sectie over trouwen bij Villa 1855
- Statistieken (200+ bruiloften, etc.)
- Uitgebreide feature secties (Ceremonie, Receptie, Diner, Feest)
- Timeline component voor dagindeling
- Reviews van bruidsparen
- FAQ accordion
- CTA voor bezichtiging

**Locatie:** `/home/claude/cookaholics-design-system/villa1855-bruiloften.html`

#### 3. Zakelijk Pagina (villa1855-zakelijk.html) - NIEUWSTE VERSIE
- Page hero met zakelijke focus ("Maak indruk met karakter")
- **YouTube Video Embed** (Brandblocks-stijl, 16:9, fullwidth)
- Statistieken (200+ zakelijke events, etc.)
- Event types grid (Netwerkborrel, Presentatie, Bedrijfsfeest, Relatiedag)
- Feature secties (Faciliteiten, Catering)
- **Interactieve Arrangement Configurator:**
  - 4 arrangement types met tabs
  - Datumkiezer
  - Aantal gasten input
  - 3 pricing tiers per arrangement (Basis/Comfort/Premium)
  - Dynamische prijsberekening
  - Sample programma's per type
- Reviews van zakelijke klanten
- FAQ specifiek voor zakelijke events
- **Chat & Beschikbaarheid Widget** (rechtsonder):
  - Floating button
  - Beschikbaarheid checker met alternatieve data
  - Chat functionaliteit
- Alle tekst in je/jij-vorm

**Locatie:** `/home/claude/villa1855-zakelijk.html`

#### 4. Brochure (12 pagina's)
- Interactieve HTML brochure
- Navigatie met page dots
- Print-ready styling
- Alle bruiloft informatie

### Pricing Structuur (Zakelijk)

| Arrangement | Basis | Comfort | Premium |
|-------------|-------|---------|---------|
| Netwerkborrel | €50 p.p. | €60 p.p. | €70 p.p. |
| Vergaderdag | €65 p.p. | €80 p.p. | €110 p.p. |
| Relatiedag | €95 p.p. | €125 p.p. | €165 p.p. |
| Bedrijfsfeest | €85 p.p. | €110 p.p. | €145 p.p. |

---

## Deel 3: Nog Te Bouwen Pagina's

### Villa 1855 Website
1. **De Locatie** - Uitgebreide pagina over de villa zelf
   - Geschiedenis van het pand
   - Ruimtes en capaciteiten
   - Fotogalerij per ruimte
   - Plattegrond
   - Bereikbaarheid en parkeren

2. **Cases / Portfolio** - Voorbeelden van events
   - Case studies met foto's
   - Verschillende event types
   - Testimonials gekoppeld aan cases

3. **Contact** - Contactpagina
   - Contactformulier
   - Routebeschrijving
   - FAQ
   - Directe contactgegevens

4. **Bijzondere Vieringen** (optioneel aparte pagina)
   - Jubilea, verjaardagen, thema-avonden
   - Arrangementen en mogelijkheden

### Overige Merken (Design System Ready)
- The Laughing Cat website
- Pitt BBQ website (template al gemaakt)
- FC Den Bosch Businessclub
- Cookaholics hoofdsite redesign

---

## Deel 4: Stappenplan - Van Ontwerp naar Live Website

### Fase 1: Ontwerp & Prototype (Waar we nu zijn)
1. ✅ Design system opgezet met CSS variabelen
2. ✅ Basis template structuur gemaakt
3. ✅ Homepage, Bruiloften en Zakelijk pagina's gebouwd
4. ✅ Interactieve componenten (configurator, chat widget)
5. ⏳ Resterende pagina's bouwen

### Fase 2: Content & Assets Verzamelen
1. **Fotografie**
   - Professionele foto's van de villa (alle ruimtes)
   - Sfeerbeelden van events
   - Team foto's
   - Catering/food shots

2. **Teksten**
   - Definitieve copy per pagina
   - SEO-geoptimaliseerde teksten
   - Meta descriptions

3. **Logo's & Branding**
   - Logo in verschillende formaten (PNG, SVG)
   - Favicon
   - Social media assets

4. **Video Content**
   - Villa tour video
   - Event highlights
   - Testimonial videos

### Fase 3: Development Setup
1. **Kies een platform/stack:**
   - **Optie A: Statische site** (HTML/CSS/JS zoals nu)
     - Simpel, snel, goedkoop hosting
     - Geschikt voor content die niet vaak wijzigt
   
   - **Optie B: CMS (Headless)**
     - Strapi, Contentful, of Sanity
     - Content editors kunnen zelf aanpassen
     - Vereist meer setup
   
   - **Optie C: WordPress**
     - Bekende interface
     - Veel plugins
     - Vereist custom theme development

2. **Project opzetten in Cursor IDE:**
   ```bash
   mkdir villa1855-website
   cd villa1855-website
   # Kopieer alle HTML bestanden
   # Structuur opzetten:
   # /assets (images, fonts)
   # /css (stylesheets)
   # /js (scripts)
   # /pages (HTML pagina's)
   ```

3. **Lokale ontwikkelomgeving:**
   - VS Code of Cursor met Live Server
   - Browser DevTools voor testing
   - Mobile responsiveness checken

### Fase 4: Optimalisatie
1. **Performance**
   - Afbeeldingen optimaliseren (WebP, lazy loading)
   - CSS/JS minificeren
   - Caching instellen

2. **SEO**
   - Meta tags per pagina
   - Structured data (JSON-LD)
   - Sitemap.xml
   - robots.txt

3. **Accessibility**
   - Alt teksten voor afbeeldingen
   - Keyboard navigatie
   - ARIA labels
   - Contrast checks

4. **Cross-browser testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers
   - Verschillende schermformaten

### Fase 5: Hosting & Deployment
1. **Domein**
   - villa1855.nl registreren/beheren
   - SSL certificaat (HTTPS)

2. **Hosting opties:**
   - **Vercel** (gratis, automatische deploys)
   - **Netlify** (gratis tier, form handling)
   - **Cloudflare Pages** (gratis, snel)
   - **Traditionele hosting** (TransIP, Antagonist)

3. **Deployment workflow:**
   ```
   Code wijziging → Git push → Automatische deploy → Live
   ```

### Fase 6: Integraties & Automatisering
1. **Formulieren**
   - Contactformulier → email/CRM
   - Offerte aanvragen → notificatie systeem

2. **Beschikbaarheid/Boekingen**
   - Koppeling met agenda systeem
   - Real-time beschikbaarheid checker
   - Optioneel: online boeken

3. **Analytics**
   - Google Analytics 4
   - Hotjar voor heatmaps
   - Conversie tracking

4. **Email marketing**
   - Nieuwsbrief signup
   - Automatische follow-ups

### Fase 7: Launch & Monitoring
1. **Pre-launch checklist:**
   - [ ] Alle pagina's getest
   - [ ] Formulieren werken
   - [ ] Mobile responsive
   - [ ] SSL actief
   - [ ] 404 pagina aanwezig
   - [ ] Analytics geïnstalleerd

2. **Soft launch**
   - Intern team test eerst
   - Feedback verzamelen
   - Bugs fixen

3. **Go-live**
   - DNS wijzigen naar nieuwe hosting
   - Redirects instellen (als er oude site is)
   - Social media aankondigen

4. **Post-launch**
   - Performance monitoren
   - User feedback verzamelen
   - Iteratief verbeteren

---

## Belangrijke Bestanden

| Bestand | Beschrijving | Locatie |
|---------|--------------|---------|
| villa1855.html | Homepage | /home/claude/cookaholics-design-system/ |
| villa1855-bruiloften.html | Bruiloften pagina | /home/claude/cookaholics-design-system/ |
| villa1855-zakelijk.html | Zakelijk pagina (nieuwste) | /home/claude/ |
| DOCUMENTATIE.md | Design system handleiding | /home/claude/cookaholics-design-system/ |
| pitt.html | Pitt BBQ template | /home/claude/cookaholics-design-system/ |

---

## Design System Kleuren

### Villa 1855
| Naam | HEX | Gebruik |
|------|-----|---------|
| Primary Darkest | #102B2A | Achtergronden, tekst |
| Primary Dark | #405656 | Secundaire elementen |
| Accent (Koper) | #B58C67 | Buttons, links, highlights |
| Off-white | #F5F7F8 | Pagina achtergrond |

### Pitt BBQ
| Naam | HEX | Gebruik |
|------|-----|---------|
| Primary Darkest | #1A2E0A | Achtergronden |
| Accent (Oranje) | #FF6B1A | Fire, CTA's |
| Yellow | #F5C623 | Highlights, headings |

---

*Document gegenereerd: December 2025*
*Cookaholics Design System v1.0*
