// Site-wide data for Villa 1855

export const siteConfig = {
  name: 'Villa 1855',
  tagline: 'Evenementenlocatie Tilburg',
  description: 'Historische charme en moderne luxe voor bruiloften, zakelijke events en bijzondere vieringen.',
  url: 'https://www.villa1855.nl',
}

export const contactInfo = {
  address: {
    street: 'Noordstraat 36',
    postalCode: '5038 EJ',
    city: 'Tilburg',
    country: 'Nederland',
    full: 'Noordstraat 36, 5038 EJ Tilburg',
  },
  phone: '085-2736709',
  phoneLink: 'tel:+31852736709',
  email: 'info@villa1855.nl',
  emailLink: 'mailto:info@villa1855.nl',
}

export const socialLinks = {
  instagram: 'https://www.instagram.com/villa.1855/',
  facebook: 'https://www.facebook.com/villa1855/',
  linkedin: 'https://www.linkedin.com/company/villa1855/',
  tiktok: 'https://www.tiktok.com/@villa1855',
}

export const navigation = {
  main: [
    { name: 'Home', href: '/', external: false },
    { name: 'Trouwen', href: '/trouwen', external: false },
    { name: 'Zakelijk', href: '/zakelijk', external: false },
    { name: 'Pop-up Restaurant', href: '/popup-restaurant', external: false },
    { name: 'Open Dagen', href: '/open-trouw-route', external: false },
    { name: 'De Locatie', href: '/locatie', external: false },
    { name: 'Beschikbaarheid', href: '/beschikbaarheid', external: false },
    { name: 'Contact', href: '/contact', external: false },
  ],
  footer: {
    events: [
      { name: 'Trouwen', href: '/trouwen' },
      { name: 'Zakelijk', href: '/zakelijk' },
      { name: 'Vieringen', href: '/vieringen' },
      { name: 'Pop-up Restaurant', href: '/popup-restaurant' },
    ],
    info: [
      { name: 'De Locatie', href: '/locatie' },
      { name: 'Beschikbaarheid', href: '/beschikbaarheid' },
      { name: 'Open Dagen', href: '/open-trouw-route' },
      { name: 'Contact', href: '/contact' },
    ],
  },
}

// Open Dagen 2026
export const openDays = [
  { date: '2026-04-12', label: '12 april 2026' },
  { date: '2026-06-28', label: '28 juni 2026' },
  { date: '2026-09-27', label: '27 september 2026' },
  { date: '2026-11-22', label: '22 november 2026' },
]

// YouTube videos
export const videos = {
  zakelijk: 'FYhpMGblwMo',
  algemeen: 'ko5JAY5v7-E',
  bruiloften: 'zWrWAQ3buKc',
}

// Stats
export const stats = {
  bruiloften: {
    items: [
      { number: '200+', label: 'Bruiloften' },
      { number: '1855', label: 'Bouwjaar' },
      { number: '150', label: 'Max. gasten' },
      { number: '4.9', label: 'Beoordeling' },
    ],
  },
  zakelijk: {
    items: [
      { number: '200+', label: 'Zakelijke events' },
      { number: '10-150', label: 'Gasten' },
      { number: '2', label: 'Unieke zalen' },
      { number: '100%', label: 'Op maat' },
    ],
  },
}
