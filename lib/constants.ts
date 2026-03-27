import type { EventType } from './types'

// ─── Communes ────────────────────────────────────────────────────────────────

export const COMMUNES = [
  { id: 'ixelles', name: 'Ixelles', rent: 1100, vibe: 'Cosmopolitan, lively',
    expat: 5, transit: 5, green: 3, safety: 4, walk: 5,
    desc: 'Heart of expat Brussels. ULB, Flagey, great restaurants.',
    lat: 50.827, lng: 4.371, immoweb: 'ixelles' },
  { id: 'etterbeek', name: 'Etterbeek', rent: 950, vibe: 'Quiet, EU quarter',
    expat: 4, transit: 4, green: 3, safety: 4, walk: 4,
    desc: 'Near EU institutions. Good value, Cinquantenaire park.',
    lat: 50.836, lng: 4.389, immoweb: 'etterbeek' },
  { id: 'saint-gilles', name: 'Saint-Gilles', rent: 900, vibe: 'Artsy, diverse',
    expat: 4, transit: 4, green: 2, safety: 3, walk: 5,
    desc: 'Most character per m². Parvis, art nouveau, great bars.',
    lat: 50.826, lng: 4.346, immoweb: 'saint-gilles' },
  { id: 'schaerbeek', name: 'Schaerbeek', rent: 800, vibe: 'Up-and-coming',
    expat: 3, transit: 4, green: 3, safety: 3, walk: 3,
    desc: 'Gentrifying fast. Beautiful townhouses, good value.',
    lat: 50.862, lng: 4.378, immoweb: 'schaerbeek' },
  { id: 'woluwe-sl', name: 'Woluwe-St-Lambert', rent: 1050, vibe: 'Green, families',
    expat: 4, transit: 3, green: 5, safety: 5, walk: 3,
    desc: 'Quiet, leafy, near international schools.',
    lat: 50.842, lng: 4.430, immoweb: 'woluwe-saint-lambert' },
  { id: 'uccle', name: 'Uccle', rent: 1200, vibe: 'Upscale, residential',
    expat: 4, transit: 3, green: 5, safety: 5, walk: 3,
    desc: 'Bois de la Cambre area. Spacious, green, pricey.',
    lat: 50.800, lng: 4.340, immoweb: 'uccle' },
  { id: 'forest', name: 'Forest', rent: 850, vibe: 'Residential, emerging',
    expat: 2, transit: 3, green: 4, safety: 4, walk: 3,
    desc: 'Altitude Cent, Wiels art center, still affordable.',
    lat: 50.810, lng: 4.324, immoweb: 'forest' },
  { id: 'auderghem', name: 'Auderghem', rent: 950, vibe: 'Quiet, forested',
    expat: 3, transit: 3, green: 5, safety: 5, walk: 2,
    desc: 'Sonian Forest edge, close to EU, suburban feel.',
    lat: 50.814, lng: 4.427, immoweb: 'auderghem' },
  { id: 'bruxelles', name: 'Bruxelles-Ville', rent: 1050, vibe: 'Central, varied',
    expat: 4, transit: 5, green: 2, safety: 3, walk: 5,
    desc: 'Grand Place, Dansaert. Very central, variable by neighborhood.',
    lat: 50.847, lng: 4.352, immoweb: 'bruxelles' },
  { id: 'woluwe-sp', name: 'Woluwe-St-Pierre', rent: 1150, vibe: 'Quiet, upscale',
    expat: 4, transit: 3, green: 5, safety: 5, walk: 3,
    desc: 'Parc de Woluwe, Stockel, international schools.',
    lat: 50.831, lng: 4.441, immoweb: 'woluwe-saint-pierre' },
] as const

// ─── Events ──────────────────────────────────────────────────────────────────

export const EVENTS_2026: Array<{ date: string; title: string; type: EventType; desc: string }> = [
  { date: '2026-01-01', title: "New Year's Day", type: 'holiday', desc: 'Public holiday. Most shops closed.' },
  { date: '2026-04-06', title: 'Easter Monday', type: 'holiday', desc: 'Public holiday.' },
  { date: '2026-05-01', title: 'Labour Day', type: 'holiday', desc: 'Public holiday. Union marches in city center.' },
  { date: '2026-05-14', title: 'Ascension Day', type: 'holiday', desc: 'Public holiday. Thursday — many take Friday off.' },
  { date: '2026-05-25', title: 'Whit Monday', type: 'holiday', desc: 'Public holiday.' },
  { date: '2026-07-21', title: 'Belgian National Day', type: 'holiday', desc: 'Military parade, fireworks at Cinquantenaire, concerts.' },
  { date: '2026-08-15', title: 'Assumption of Mary', type: 'holiday', desc: 'Public holiday.' },
  { date: '2026-11-01', title: "All Saints' Day", type: 'holiday', desc: 'Public holiday.' },
  { date: '2026-11-11', title: 'Armistice Day', type: 'holiday', desc: 'Public holiday. Ceremonies at Tomb of Unknown Soldier.' },
  { date: '2026-12-25', title: 'Christmas Day', type: 'holiday', desc: 'Public holiday. Everything closed.' },
  { date: '2026-05-31', title: 'Brussels 20km', type: 'event', desc: '46th edition. 38,000+ runners. Register at 20kmdebruxelles.be from April 1.' },
  { date: '2026-06-21', title: 'Fête de la Musique', type: 'event', desc: 'Free live music citywide. Flagey, Grand Place, Saint-Géry.' },
  { date: '2026-09-20', title: 'Car-Free Sunday', type: 'event', desc: 'Entire Brussels Region car-free 9:30am–7pm. STIB free.' },
  { date: '2026-07-01', title: 'Summer sales begin', type: 'event', desc: 'Official start of summer sales. Runs ~4 weeks.' },
  { date: '2026-12-06', title: 'Saint-Nicolas', type: 'event', desc: 'Belgian gift-giving day for children. Culturally huge.' },
  { date: '2026-11-02', title: 'Brussels Marathon', type: 'event', desc: 'Approximate. Marathon + half-marathon through the city. Check brusselsairportmarathon.be.' },
  { date: '2026-11-27', title: "Plaisirs d'Hiver opens", type: 'event', desc: "Approximate. Christmas market, ice rink, Grand Place lights. ~6 weeks. Confirm at plaisirsdhiver.be." },
  { date: '2026-07-11', title: 'Flemish Community Day', type: 'info', desc: 'Not a Brussels public holiday but many offices observe it. Flanders only officially.' },
  { date: '2026-10-01', title: 'Mutuelle renewal check', type: 'info', desc: 'Good time to verify your health insurance membership and annual fees.' },
]

export const TAX_RESOURCES = [
  { name: 'Tax-on-Web (MyMinfin)', url: 'https://eservices.minfin.fgov.be/myminfin-web/', desc: 'File your Belgian tax return online' },
  { name: 'FPS Finance — Tax Calendar', url: 'https://finance.belgium.be/en', desc: 'Official dates and deadlines' },
]

// ─── Checklist ────────────────────────────────────────────────────────────────

export const CHECKLIST = [
  { cat: 'Before You Arrive', items: [
    { id: 'visa', label: 'Visa / work permit', desc: 'EU citizens: not needed. Non-EU: employer usually handles.' },
    { id: 'housing', label: 'Secure housing', desc: 'Need a registered address for commune. Temporary is fine.' },
    { id: 'docs', label: 'Gather documents', desc: 'Passport, birth certificate (apostilled), marriage cert, employment contract, 6× passport photos.' },
    { id: 'insurance', label: 'Health insurance', desc: 'Mandatory. Employer-provided or private.' },
  ]},
  { cat: 'First Week', items: [
    { id: 'commune', label: 'Register at commune', desc: 'Bring lease + passport + photos. Police verify address within 2 weeks.' },
    { id: 'bank', label: 'Open bank account', desc: 'KBC, BNP Paribas Fortis, ING, Belfius. Need passport + commune receipt + contract.' },
    { id: 'phone', label: 'Belgian phone number', desc: 'Proximus, Orange, BASE, Mobile Vikings. Bring ID.' },
    { id: 'stib', label: 'Get STIB/MOBIB card', desc: 'At any metro station. Employer may cover via third-party payer.' },
  ]},
  { cat: 'First Month', items: [
    { id: 'mutuelle', label: 'Register with mutuelle', desc: 'Partenamut, Solidaris, CM. Mandatory top-up health insurance.' },
    { id: 'energy', label: 'Energy contracts', desc: 'Engie, Luminus, TotalEnergies. Compare at monenergie.be.' },
    { id: 'internet', label: 'Internet setup', desc: 'Proximus, Telenet, Orange, Scarlet. 2-week wait is normal.' },
    { id: 'gp', label: 'Find a GP', desc: 'Many speak English in expat areas. Use doctena.be.' },
    { id: 'verify', label: 'Address verification visit', desc: 'Police officer visits your home. Just be there.' },
  ]},
  { cat: 'First 3 Months', items: [
    { id: 'eid', label: 'Collect residence card', desc: 'After verification, pick up eID at commune. 2–4 weeks.' },
    { id: 'license', label: 'Exchange driving license', desc: 'EU: valid. Non-EU: exchange within 185 days.' },
    { id: 'language', label: 'Start language classes', desc: 'Alliance Française, CVO, Bruxelles Formation. Some communes offer free courses.' },
  ]},
] as const

// ─── Templates ───────────────────────────────────────────────────────────────

export const TEMPLATES = [
  { id: 'landlord', title: 'Landlord Introduction', desc: 'First contact about an apartment', free: true,
    fields: ['landlord_name', 'address', 'platform', 'nationality', 'company', 'move_date', 'your_name'],
    en: `Dear {landlord_name},\n\nI'm interested in the apartment at {address} listed on {platform}. I'm a {nationality} professional working at {company} in Brussels.\n\nHappy to provide references. Looking to move in around {move_date}.\n\nBest regards,\n{your_name}`,
    fr: `Madame, Monsieur,\n\nJe me permets de vous contacter au sujet de l'appartement au {address} sur {platform}. Professionnel(le) {nationality} chez {company} à Bruxelles.\n\nRéférences disponibles. Emménagement souhaité vers le {move_date}.\n\nCordialement,\n{your_name}` },
  { id: 'commune', title: 'Commune Registration', desc: 'Request an appointment at your commune', free: true,
    fields: ['commune', 'address', 'your_name'],
    en: `Dear Sir/Madam,\n\nI've recently moved to {commune} at {address} and would like to register as a resident.\n\nCould you let me know what documents I need and whether I need an appointment?\n\nBest regards,\n{your_name}`,
    fr: `Madame, Monsieur,\n\nJe viens de m'installer à {commune} à l'adresse {address} et je souhaiterais m'inscrire en tant que résident(e).\n\nPourriez-vous m'indiquer les documents nécessaires et si un rendez-vous est requis ?\n\nCordialement,\n{your_name}` },
  { id: 'energy', title: 'Energy Contract', desc: 'Set up gas and electricity', free: false,
    fields: ['address', 'move_date', 'ean_electricity', 'ean_gas', 'your_name'],
    en: `Dear Sir/Madam,\n\nI am moving into {address} on {move_date} and would like to set up gas and electricity.\n\nMeter numbers:\n- Electricity: {ean_electricity}\n- Gas: {ean_gas}\n\nCould you send me a quote?\n\nThank you,\n{your_name}`,
    fr: `Madame, Monsieur,\n\nJ'emménage au {address} le {move_date} et souhaiterais souscrire un contrat gaz et électricité.\n\nNuméros de compteur :\n- Électricité : {ean_electricity}\n- Gaz : {ean_gas}\n\nPourriez-vous m'envoyer un devis ?\n\nCordialement,\n{your_name}` },
  { id: 'repair', title: 'Repair Request', desc: 'Report a maintenance issue to landlord', free: false,
    fields: ['landlord_name', 'address', 'issue_description', 'your_name'],
    en: `Dear {landlord_name},\n\nI am writing about a maintenance issue at {address}.\n\n{issue_description}\n\nCould we arrange a repair at your earliest convenience?\n\nThank you,\n{your_name}`,
    fr: `Cher/Chère {landlord_name},\n\nJe vous signale un problème d'entretien au {address}.\n\n{issue_description}\n\nSerait-il possible d'organiser une intervention dans les meilleurs délais ?\n\nCordialement,\n{your_name}` },
  { id: 'lease', title: 'Lease Termination', desc: 'Formal notice to end your lease', free: false,
    fields: ['landlord_name', 'lease_date', 'address', 'departure_date', 'notice_period', 'your_name'],
    en: `Dear {landlord_name},\n\nIn accordance with our lease agreement dated {lease_date}, I hereby give notice to terminate the lease at {address}.\n\nMy intended departure date is {departure_date}, providing {notice_period} notice.\n\nI would like to arrange the exit inspection (état des lieux de sortie).\n\nThank you,\n{your_name}`,
    fr: `Cher/Chère {landlord_name},\n\nConformément à notre contrat de bail en date du {lease_date}, je vous informe de mon intention de résilier le bail au {address}.\n\nDate de départ prévue : {departure_date}, respectant un préavis de {notice_period}.\n\nJe souhaiterais convenir d'une date pour l'état des lieux de sortie.\n\nCordialement,\n{your_name}` },
  { id: 'bank', title: 'Bank Account Opening', desc: 'Request to open a bank account', free: false,
    fields: ['nationality', 'company', 'your_name'],
    en: `Dear Sir/Madam,\n\nI have recently relocated to Brussels and would like to open a current account.\n\nI am a {nationality} citizen working at {company}. I can provide my passport, commune registration, and employment contract.\n\nCould you let me know the next available appointment?\n\nThank you,\n{your_name}`,
    fr: `Madame, Monsieur,\n\nJe viens de m'installer à Bruxelles et souhaiterais ouvrir un compte courant.\n\nDe nationalité {nationality}, employé(e) chez {company}. Passeport, inscription communale et contrat de travail disponibles.\n\nProchain créneau disponible ?\n\nCordialement,\n{your_name}` },
  { id: 'gp', title: 'GP Registration', desc: 'Register with a general practitioner', free: false,
    fields: ['area', 'mutuelle', 'your_name'],
    en: `Dear Doctor,\n\nI have recently moved to Brussels and am looking for a GP in the {area} area.\n\nI have Belgian health insurance through {mutuelle}.\n\nAre you currently accepting new patients?\n\nThank you,\n{your_name}`,
    fr: `Cher Docteur,\n\nJe viens de m'installer à Bruxelles et recherche un médecin généraliste à {area}.\n\nAffili(é) à {mutuelle}.\n\nAcceptez-vous de nouveaux patients ?\n\nCordialement,\n{your_name}` },
] as const

// ─── User Profiles ────────────────────────────────────────────────────────────

export type UserProfile = 'eu' | 'non-eu' | 'student'

export const PROFILES = {
  eu: {
    label: 'EU Professional',
    icon: 'Briefcase',
    desc: 'Working in Brussels with EU citizenship',
    checklist_notes: {
      visa: 'Not needed — EU free movement applies.',
      license: 'Your EU license is valid indefinitely in Belgium.',
    },
    budget_default: 'moderate' as const,
    top_communes: ['ixelles', 'etterbeek', 'saint-gilles'],
  },
  'non-eu': {
    label: 'Non-EU Professional',
    icon: 'Globe',
    desc: 'Working in Brussels with a work permit',
    checklist_notes: {
      visa: 'Your employer should arrange your Single Permit. Bring Annex 46 to the commune.',
      license: 'Exchange within 185 days if from a recognized country. Otherwise take Belgian test.',
    },
    budget_default: 'moderate' as const,
    top_communes: ['etterbeek', 'woluwe-sl', 'auderghem'],
  },
  student: {
    label: 'Student / Trainee',
    icon: 'GraduationCap',
    desc: 'Studying or interning in Brussels',
    checklist_notes: {
      visa: 'EU students: no visa. Non-EU: student visa via Belgian embassy.',
      insurance: 'Check if your university provides insurance. Otherwise get private cover.',
    },
    budget_default: 'budget' as const,
    top_communes: ['ixelles', 'saint-gilles', 'schaerbeek'],
  },
} as const

// ─── Plan Questions ───────────────────────────────────────────────────────────

export const PLAN_QUESTIONS = [
  { id: 'profile', question: 'What brings you to Brussels?',
    options: [
      { value: 'eu', label: 'EU Professional', icon: 'Briefcase' },
      { value: 'non-eu', label: 'Non-EU Professional', icon: 'Globe' },
      { value: 'student', label: 'Student / Trainee', icon: 'GraduationCap' },
    ]},
  { id: 'move_date', question: 'When are you moving?', type: 'month-picker' },
  { id: 'budget', question: 'Monthly budget for rent?',
    options: [
      { value: 'budget', label: 'Under €800' },
      { value: 'moderate', label: '€800–€1100' },
      { value: 'comfortable', label: '€1100+' },
    ]},
  { id: 'vibe', question: 'What matters most to you?',
    options: [
      { value: 'lively', label: 'Lively & social' },
      { value: 'green', label: 'Green & quiet' },
      { value: 'central', label: 'Central & walkable' },
      { value: 'family', label: 'Family-friendly' },
    ]},
  { id: 'commute', question: 'Where will you commute to?',
    options: [
      { value: 'eu-quarter', label: 'EU Quarter / Schuman' },
      { value: 'city-center', label: 'City Center' },
      { value: 'nato', label: 'NATO / Evere' },
      { value: 'remote', label: 'Remote / No commute' },
      { value: 'university', label: 'ULB / VUB / KUL' },
    ]},
] as const

// ─── Currencies ───────────────────────────────────────────────────────────────

export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
] as const

// ─── Monthly Costs ────────────────────────────────────────────────────────────

export const MONTHLY_COSTS = [
  { label: 'Rent (1-bed apartment)', budget: 750, moderate: 1050, comfortable: 1350 },
  { label: 'Utilities (gas, electricity, water)', budget: 100, moderate: 150, comfortable: 200 },
  { label: 'Internet', budget: 30, moderate: 50, comfortable: 70 },
  { label: 'Groceries', budget: 250, moderate: 350, comfortable: 500 },
  { label: 'Eating out & takeaway', budget: 100, moderate: 200, comfortable: 400 },
  { label: 'Public transport (STIB)', budget: 50, moderate: 50, comfortable: 100 },
  { label: 'Health insurance (mutuelle)', budget: 50, moderate: 80, comfortable: 120 },
  { label: 'Leisure & entertainment', budget: 100, moderate: 200, comfortable: 400 },
  { label: 'Clothing & personal care', budget: 50, moderate: 100, comfortable: 200 },
] as const

// ─── Communities ──────────────────────────────────────────────────────────────

export const COMMUNITIES = [
  { id: 'brussels-expats', name: 'Brussels Expats', platform: 'Facebook', members: '65K+', desc: 'The largest English-speaking expat group in Brussels. Housing, jobs, events.', url: 'https://www.facebook.com/groups/brusselsexpats' },
  { id: 'r-brussels', name: 'r/brussels', platform: 'Reddit', members: '85K+', desc: 'Active Reddit community for Brussels residents. Local news, questions, events.', url: 'https://www.reddit.com/r/brussels' },
  { id: 'internations', name: 'InterNations Brussels', platform: 'InterNations', members: '50K+', desc: 'Global expat network with regular Brussels events and networking.', url: 'https://www.internations.org/brussels-expats' },
  { id: 'the-bulletin', name: 'The Bulletin', platform: 'Website', members: 'News', desc: 'Belgium\'s English-language magazine covering expat life, politics, culture.', url: 'https://www.thebulletin.be' },
  { id: 'brussels-times', name: 'Brussels Times', platform: 'Website', members: 'News', desc: 'English-language daily news from Brussels and Belgium.', url: 'https://www.brusselstimes.com' },
  { id: 'meetup', name: 'Meetup Brussels', platform: 'Meetup', members: '10K+', desc: 'Hundreds of groups: language exchange, hiking, tech, sports, culture.', url: 'https://www.meetup.com/cities/be/brussels' },
  { id: 'expat-welcome', name: 'Expat Welcome Desk', platform: 'Official', members: 'City Service', desc: 'Official Brussels city service for expats. Free one-on-one guidance.', url: 'https://www.welcometobrussels.be' },
  { id: 'basg', name: 'BASG', platform: 'Association', members: '2K+', desc: 'Brussels Anglo-Speaking Groups — social clubs, charity, networking.', url: 'https://basg.be' },
  { id: 'brussels-english', name: 'Brussels English Speaking', platform: 'Facebook', members: '15K+', desc: 'General English-speaking community group for all things Brussels.', url: 'https://www.facebook.com/groups/BrusselsEnglishSpeaking' },
  { id: 'eu-staff', name: 'EU Staff & Expats', platform: 'Facebook', members: '20K+', desc: 'EU institutions staff and Brussels professionals. Housing, transport, lifestyle.', url: 'https://www.facebook.com/groups/EUstaffBrussels' },
] as const

// ─── Housing Links ────────────────────────────────────────────────────────────

export const HOUSING_LINKS = [
  { name: 'Immoweb', desc: 'Belgium\'s largest real estate platform. Biggest inventory.', url: 'https://www.immoweb.be/en/search/apartment/for-rent?countries=BE&postalCodes=1000,1050,1060,1040,1030,1080,1170,1160,1180,1150', badge: 'Most Popular' },
  { name: 'Zimmo', desc: 'Second-largest Belgian platform. Good for house hunting.', url: 'https://www.zimmo.be/en/', badge: '' },
  { name: 'Spotahome', desc: 'Book verified rooms and apartments remotely before you arrive.', url: 'https://www.spotahome.com/brussels', badge: 'Expat Friendly' },
  { name: 'HousingAnywhere', desc: 'Mid-term rentals (1–12 months). Popular with students and expats.', url: 'https://housinganywhere.com/Brussels--Belgium', badge: 'Short-term OK' },
  { name: 'FB Housing Brussels', desc: 'Brussels Housing & Expats Facebook group. Many direct landlord posts.', url: 'https://www.facebook.com/groups/housingbrussels', badge: 'No Fees' },
] as const

// ─── Useful Links ─────────────────────────────────────────────────────────────

export const USEFUL_LINKS = [
  { name: 'STIB/MIVB', desc: 'Brussels public transit — metro, tram, bus timetables and tickets', url: 'https://www.stib-mivb.be/article.html?_guid=7c0fd748-15b9-3410-8b91-a3cb84e6dc1e&l=en' },
  { name: 'Belgian Train (SNCB)', desc: 'National rail network — Brussels to Ghent, Bruges, Antwerp, etc.', url: 'https://www.belgiantrain.be/en' },
  { name: 'Tax-on-Web (MyMinfin)', desc: 'File your Belgian tax return and manage tax affairs online', url: 'https://eservices.minfin.fgov.be/myminfin-web/' },
  { name: 'Expat Welcome Desk', desc: 'Official Brussels city service for expats — free guidance', url: 'https://www.welcometobrussels.be' },
  { name: 'FPS Finance', desc: 'Belgian Federal Public Service Finance — official tax information', url: 'https://finance.belgium.be/en' },
  { name: 'Doctena', desc: 'Book GP and specialist appointments online in Brussels', url: 'https://www.doctena.be/en' },
  { name: 'Brussels Environment', desc: 'Waste, recycling, energy — Brussels Region official', url: 'https://environnement.brussels/en' },
  { name: 'Visit Brussels', desc: 'Events, culture, what to do in Brussels', url: 'https://visit.brussels/en' },
] as const

// ─── Weather Codes (WMO) ──────────────────────────────────────────────────────

export const WEATHER_CODES: Record<number, { emoji: string; label: string }> = {
  0: { emoji: '☀️', label: 'Clear sky' },
  1: { emoji: '🌤️', label: 'Mainly clear' },
  2: { emoji: '⛅', label: 'Partly cloudy' },
  3: { emoji: '☁️', label: 'Overcast' },
  45: { emoji: '🌫️', label: 'Foggy' },
  48: { emoji: '🌫️', label: 'Icy fog' },
  51: { emoji: '🌦️', label: 'Light drizzle' },
  53: { emoji: '🌦️', label: 'Drizzle' },
  55: { emoji: '🌦️', label: 'Heavy drizzle' },
  61: { emoji: '🌧️', label: 'Light rain' },
  63: { emoji: '🌧️', label: 'Rain' },
  65: { emoji: '🌧️', label: 'Heavy rain' },
  71: { emoji: '🌨️', label: 'Light snow' },
  73: { emoji: '🌨️', label: 'Snow' },
  75: { emoji: '🌨️', label: 'Heavy snow' },
  77: { emoji: '🌨️', label: 'Snow grains' },
  80: { emoji: '🌦️', label: 'Rain showers' },
  81: { emoji: '🌦️', label: 'Moderate showers' },
  82: { emoji: '⛈️', label: 'Heavy showers' },
  85: { emoji: '🌨️', label: 'Snow showers' },
  86: { emoji: '🌨️', label: 'Heavy snow showers' },
  95: { emoji: '⛈️', label: 'Thunderstorm' },
  96: { emoji: '⛈️', label: 'Thunderstorm + hail' },
  99: { emoji: '⛈️', label: 'Thunderstorm + heavy hail' },
}

export function getWeatherCode(code: number): { emoji: string; label: string } {
  return WEATHER_CODES[code] ?? { emoji: '🌡️', label: 'Unknown' }
}

// ─── Map Landmarks ────────────────────────────────────────────────────────────

export const MAP_LANDMARKS = [
  { name: 'Grand Place', lat: 50.846, lng: 4.352 },
  { name: 'EU Quarter / Schuman', lat: 50.844, lng: 4.378 },
  { name: 'Cinquantenaire', lat: 50.841, lng: 4.395 },
  { name: 'Flagey', lat: 50.826, lng: 4.374 },
  { name: 'NATO HQ', lat: 50.880, lng: 4.419 },
  { name: 'Brussels-Midi', lat: 50.836, lng: 4.336 },
] as const

// ─── Nav Items ────────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: 'Home' },
  { href: '/plan', label: 'Plan', icon: 'Map' },
  { href: '/this-week', label: 'This Week', icon: 'Newspaper' },
  { href: '/checklist', label: 'Checklist', icon: 'CheckSquare' },
  { href: '/calendar', label: 'Calendar', icon: 'Calendar' },
  { href: '/areas', label: 'Areas', icon: 'MapPin' },
  { href: '/housing', label: 'Housing', icon: 'Building2' },
  { href: '/costs', label: 'Costs', icon: 'DollarSign' },
  { href: '/map', label: 'Map', icon: 'Globe' },
  { href: '/community', label: 'Community', icon: 'Users' },
  { href: '/templates', label: 'Templates', icon: 'FileText' },
] as const

// Mobile nav shows only the most important 5
export const MOBILE_NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: 'Home' },
  { href: '/plan', label: 'Plan', icon: 'Map' },
  { href: '/this-week', label: 'This Week', icon: 'Newspaper' },
  { href: '/checklist', label: 'Tasks', icon: 'CheckSquare' },
  { href: '/areas', label: 'Areas', icon: 'MapPin' },
] as const
