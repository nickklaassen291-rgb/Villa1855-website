# Cookaholics Design System
## Modulair Template Systeem v1.0

---

## Overzicht

Dit design system is gebouwd voor alle Cookaholics merken en locaties. Eén template, eindeloos herbruikbaar.

### Huidige merken:
- ✅ Villa 1855 (geïmplementeerd)
- 🔜 Cookaholics (moedermerk)
- 🔜 The Laughing Cat
- 🔜 Pitt BBQ
- 🔜 FC Den Bosch Businessclub
- 🔜 [Kerk locatie]

---

## Hoe een nieuw merk toevoegen

### Stap 1: Kopieer het template
Kopieer `villa1855.html` en hernoem naar je nieuwe merk (bijv. `pitt-bbq.html`)

### Stap 2: Pas de CSS variabelen aan
Zoek het `:root` blok bovenaan de CSS en vervang de kleuren:

```css
:root {
    /* === PRIMARY COLORS === */
    --color-primary-darkest: #102B2A;    /* Hoofdkleur donker */
    --color-primary-dark: #405656;       /* Hoofdkleur medium */
    --color-primary: #6F8281;            /* Hoofdkleur licht */
    --color-primary-light: #9FADAD;      /* Achtergrond tint */
    --color-primary-lighter: #CED8D8;    /* Lichte achtergrond */
    --color-primary-lightest: #E7ECEC;   /* Lichtste achtergrond */
    
    /* === ACCENT COLOR === */
    --color-accent: #B58C67;             /* Accent (buttons, links) */
    --color-accent-hover: #9A7555;       /* Accent hover state */
    
    /* === TYPOGRAPHY === */
    --font-heading: 'Lora', Georgia, serif;
    --font-body: 'Public Sans', sans-serif;
    
    /* === EFFECTS === */
    --border-radius: 0px;                /* 0 = klassiek, 8px = modern */
}
```

### Stap 3: Vervang het logo
Zoek naar `nav-logo` en `footer-logo` en vervang de `src`:

```html
<img src="pad/naar/nieuw-logo.png" alt="Merknaam" class="nav-logo">
```

### Stap 4: Pas de content aan
Vervang alle teksten, titels, en afbeeldingen in de HTML.

### Stap 5: Update de meta tags
```html
<title>Merknaam | Tagline</title>
```

---

## Kleurenschema's per merk

### Villa 1855
| Variabele | Kleur | HEX |
|-----------|-------|-----|
| primary-darkest | Donker Groen | #102B2A |
| primary-dark | Groen 700 | #405656 |
| accent | Koper | #B58C67 |

### The Laughing Cat (suggestie)
| Variabele | Kleur | HEX |
|-----------|-------|-----|
| primary-darkest | Zwart | #1A1A1A |
| primary-dark | Donker Grijs | #2D2D2D |
| accent | Rood/Oranje | #E85D04 |

### Pitt BBQ (suggestie)
| Variabele | Kleur | HEX |
|-----------|-------|-----|
| primary-darkest | Houtskool | #2C2416 |
| primary-dark | Bruin | #4A3C2A |
| accent | Vuur Oranje | #D4570B |

### FC Den Bosch (suggestie)
| Variabele | Kleur | HEX |
|-----------|-------|-----|
| primary-darkest | Club Blauw | #003366 |
| primary-dark | Medium Blauw | #004080 |
| accent | Goud | #C9A227 |

---

## Secties in het template

Het template bevat de volgende standaard secties:

1. **Navigation** - Vast menu met logo en links
2. **Hero** - Grote header met titel, subtitel en CTA
3. **Intro** - Korte introductietekst over het merk
4. **Services/Cards** - 3 diensten of aanbod cards
5. **Features/USP** - Unique selling points met afbeelding
6. **Gallery** - Foto galerij (optioneel)
7. **CTA** - Call-to-action blok
8. **Footer** - Contact, navigatie, socials

### Secties toevoegen of verwijderen
Elke sectie is een `<section>` element. Je kunt ze eenvoudig kopiëren, verwijderen of herschikken.

---

## Typografie

### Fonts laden (in `<head>`):
```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Public+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Alternatieve font-combinaties:

**Modern/Strak:**
```css
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
```

**Industrieel/BBQ:**
```css
--font-heading: 'Bebas Neue', sans-serif;
--font-body: 'Source Sans Pro', sans-serif;
```

**Aziatisch/Streetfood:**
```css
--font-heading: 'Noto Serif', serif;
--font-body: 'Noto Sans', sans-serif;
```

---

## Buttons

Drie button stijlen beschikbaar:

```html
<!-- Primair (accent kleur) -->
<a href="#" class="btn btn-primary">Tekst</a>

<!-- Secundair (donkere hoofdkleur) -->
<a href="#" class="btn btn-secondary">Tekst</a>

<!-- Outline (transparant met border) -->
<a href="#" class="btn btn-outline">Tekst</a>
```

---

## Responsive breakpoints

- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px

Het template past automatisch aan voor alle schermformaten.

---

## Checklist nieuw merk

- [ ] Template gekopieerd en hernoemd
- [ ] CSS variabelen aangepast (kleuren)
- [ ] Fonts aangepast (indien nodig)
- [ ] Logo vervangen (nav + footer)
- [ ] Alle teksten aangepast
- [ ] Afbeeldingen vervangen
- [ ] Meta tags bijgewerkt
- [ ] Contact informatie correct
- [ ] Social media links bijgewerkt
- [ ] Footer "Een Cookaholics locatie" behouden
- [ ] Getest op mobile

---

## Ondersteuning

Voor vragen of aanpassingen, neem contact op met het development team of gebruik een AI-tool zoals:
- **Cursor** - Voor code aanpassingen
- **Bolt.new** - Voor visuele aanpassingen
- **Claude** - Voor hulp en advies

---

*Cookaholics Design System v1.0 - December 2025*
