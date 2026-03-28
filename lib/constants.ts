// EVENTS_2026 — verified dates only
export const EVENTS_2026 = [
  { date: '2026-01-01', title: "New Year's Day", type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-04-06', title: 'Easter Monday', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-05-01', title: 'Labour Day', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-05-14', title: 'Ascension Day', type: 'holiday' as const, desc: 'Public holiday. Thursday — many take Friday off.' },
  { date: '2026-05-25', title: 'Whit Monday', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-05-31', title: 'Brussels 20km', type: 'event' as const, desc: '38,000 runners through Cinquantenaire. Register at 20kmdebruxelles.be.' },
  { date: '2026-06-21', title: 'Fête de la Musique', type: 'event' as const, desc: 'Free live music across the city.' },
  { date: '2026-06-26', title: 'Couleur Café', type: 'event' as const, desc: 'Music festival at Osseghem Park. June 26–28.' },
  { date: '2026-07-01', title: 'Summer sales begin', type: 'event' as const, desc: 'Official start of summer sales.' },
  { date: '2026-07-21', title: 'Belgian National Day', type: 'holiday' as const, desc: 'Parade, fireworks, concerts at Cinquantenaire.' },
  { date: '2026-08-15', title: 'Assumption of Mary', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-09-20', title: 'Car-Free Sunday', type: 'event' as const, desc: 'Brussels Region car-free 9:30am–7pm. STIB free.' },
  { date: '2026-11-01', title: "All Saints' Day", type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-11-11', title: 'Armistice Day', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-12-06', title: 'Saint-Nicolas', type: 'event' as const, desc: 'Gift-giving tradition for children.' },
  { date: '2026-12-25', title: 'Christmas Day', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-11-02', title: 'Brussels Marathon', type: 'event' as const, desc: 'Approximate. Check brusselsairportmarathon.be.' },
  { date: '2026-11-27', title: "Plaisirs d'Hiver", type: 'event' as const, desc: 'Approximate. Christmas market at Grand Place.' },
] as const

export const RECURRING_EVENTS = [
  {
    title: 'Flagey Market',
    day: 'Sunday',
    time: 'Morning',
    location: 'Place Flagey, Ixelles',
    desc: 'Weekly food and flower market. One of the best in Brussels.',
    category: 'markets' as const,
    link: null,
  },
  {
    title: 'Jeu de Balle Flea Market',
    day: 'Daily',
    time: '6am to 2pm',
    location: 'Place du Jeu de Balle, Marolles',
    desc: 'Legendary daily flea market. Best selection on weekends.',
    category: 'markets' as const,
    link: null,
  },
  {
    title: 'Midi Market',
    day: 'Sunday',
    time: 'Morning',
    location: 'Gare du Midi',
    desc: 'Huge weekly market with food from around the world.',
    category: 'markets' as const,
    link: null,
  },
  {
    title: 'Brussels Runners',
    day: 'Saturday',
    time: '10am',
    location: 'Bois de la Cambre',
    desc: 'Free weekly group run. All levels welcome.',
    category: 'sports' as const,
    link: null,
  },
  {
    title: 'Language Exchange at Cafe Belga',
    day: 'Wednesday',
    time: '7pm',
    location: 'Place Flagey, Ixelles',
    desc: 'Informal language exchange. French, English, Dutch, and more. Just show up.',
    category: 'networking' as const,
    link: 'https://www.instagram.com/cafebelga/',
  },
  {
    title: 'Drink and Draw Brussels',
    day: 'Monthly',
    time: 'Evening',
    location: 'Various locations',
    desc: 'Casual sketch meetup at different bars. Check their page for the next date.',
    category: 'networking' as const,
    link: 'https://www.instagram.com/drinkanddrawbrussels/',
  },
  {
    title: 'Wecandoo Craft Workshops',
    day: 'Various',
    time: 'Various',
    location: 'Artisan studios across Brussels',
    desc: 'Hands-on workshops: pottery, beer brewing, chocolate making, woodworking, and more.',
    category: 'workshops' as const,
    link: 'https://wecandoo.be/en/ateliers/bruxelles',
  },
] as const

export const LOCAL_CREATORS = [
  {
    handle: '@into.the.dust',
    platform: 'Instagram + TikTok',
    niche: 'Nightlife, events, bars',
    url: 'https://www.instagram.com/into.the.dust/',
    desc: 'New bars, parties, and that cozy-but-wild Brussels night out.',
  },
  {
    handle: '@bruxelles.foodguide',
    platform: 'Instagram',
    niche: 'Food and hidden gems',
    url: 'https://www.instagram.com/bruxelles.foodguide/',
    desc: 'Restaurant and drink recommendations across the city.',
  },
  {
    handle: '@theguidebrussels',
    platform: 'TikTok',
    niche: 'Hidden gems and discoveries',
    url: 'https://www.tiktok.com/@theguidebrussels',
    desc: 'Mini-guides to lesser-known places and experiences.',
  },
  {
    handle: '@brusselsbynight_',
    platform: 'Instagram',
    niche: 'Nightlife and events',
    url: 'https://www.instagram.com/brusselsbynight_/',
    desc: 'What is actually happening after dark.',
  },
  {
    handle: '@expats_in_brussels',
    platform: 'Instagram',
    niche: 'Practical tips and places',
    url: 'https://www.instagram.com/expats_in_brussels/',
    desc: 'Navigating Brussels life as a newcomer.',
  },
  {
    handle: '@brusselstimes',
    platform: 'Instagram',
    niche: 'News and events',
    url: 'https://www.instagram.com/brusselstimes/',
    desc: 'English-language Belgian news and culture.',
  },
] as const

export const COMMUNES = [
  { id: 'ixelles', name: 'Ixelles', rent: 1100, vibe: 'Cosmopolitan and lively', expat: 5, transit: 5, green: 3, safety: 4, walk: 5, desc: 'The heart of expat Brussels. Home to ULB, Place Flagey, and some of the best restaurants in the city.', lat: 50.827, lng: 4.371, immoweb: 'ixelles' },
  { id: 'etterbeek', name: 'Etterbeek', rent: 950, vibe: 'Quiet and well-connected', expat: 4, transit: 4, green: 3, safety: 4, walk: 4, desc: 'Adjacent to the EU quarter with easy access to Cinquantenaire park. Good value.', lat: 50.836, lng: 4.389, immoweb: 'etterbeek' },
  { id: 'saint-gilles', name: 'Saint-Gilles', rent: 900, vibe: 'Artsy and diverse', expat: 4, transit: 4, green: 2, safety: 3, walk: 5, desc: 'Most character per square metre. Art nouveau, Parvis market, excellent bars.', lat: 50.826, lng: 4.346, immoweb: 'saint-gilles' },
  { id: 'schaerbeek', name: 'Schaerbeek', rent: 800, vibe: 'Up-and-coming', expat: 3, transit: 4, green: 3, safety: 3, walk: 3, desc: 'Rapidly gentrifying with beautiful townhouses and good value.', lat: 50.862, lng: 4.378, immoweb: 'schaerbeek' },
  { id: 'woluwe-sl', name: 'Woluwe-Saint-Lambert', rent: 1050, vibe: 'Green and family-friendly', expat: 4, transit: 3, green: 5, safety: 5, walk: 3, desc: 'Quiet, leafy, near international schools.', lat: 50.842, lng: 4.430, immoweb: 'woluwe-saint-lambert' },
  { id: 'uccle', name: 'Uccle', rent: 1200, vibe: 'Upscale and residential', expat: 4, transit: 3, green: 5, safety: 5, walk: 3, desc: 'Near Bois de la Cambre. Spacious, green, and quiet.', lat: 50.800, lng: 4.340, immoweb: 'uccle' },
  { id: 'forest', name: 'Forest', rent: 850, vibe: 'Residential and emerging', expat: 2, transit: 3, green: 4, safety: 4, walk: 3, desc: 'Altitude Cent area is excellent. Wiels art centre. Still affordable.', lat: 50.810, lng: 4.324, immoweb: 'forest' },
  { id: 'auderghem', name: 'Auderghem', rent: 950, vibe: 'Quiet and forested', expat: 3, transit: 3, green: 5, safety: 5, walk: 2, desc: 'On the edge of the Sonian Forest. Close to EU but feels suburban.', lat: 50.814, lng: 4.427, immoweb: 'auderghem' },
  { id: 'bruxelles', name: 'Bruxelles-Ville', rent: 1050, vibe: 'Central and varied', expat: 4, transit: 5, green: 2, safety: 3, walk: 5, desc: 'Grand Place, Dansaert, Sainte-Catherine. Quality varies by street.', lat: 50.847, lng: 4.352, immoweb: 'bruxelles' },
  { id: 'woluwe-sp', name: 'Woluwe-Saint-Pierre', rent: 1150, vibe: 'Quiet and upscale', expat: 4, transit: 3, green: 5, safety: 5, walk: 3, desc: 'Parc de Woluwe, Stockel, international schools.', lat: 50.831, lng: 4.441, immoweb: 'woluwe-saint-pierre' },
] as const

export const COMMUNITIES = [
  { name: 'Brussels Expats', platform: 'Facebook', members: '65,000+', url: 'https://www.facebook.com/groups/BrusselsExpats/', desc: 'Largest English-speaking group in Brussels. Housing, admin, events, recommendations.' },
  { name: 'r/brussels', platform: 'Reddit', members: '85,000+', url: 'https://www.reddit.com/r/brussels/', desc: 'Honest opinions, local tips, commune-specific questions.' },
  { name: 'InterNations Brussels', platform: 'InterNations', members: '50,000+', url: 'https://www.internations.org/brussels-expats', desc: 'Organised events and professional networking.' },
  { name: 'Brussels Housing', platform: 'Facebook', members: '30,000+', url: 'https://www.facebook.com/groups/brusselshousing/', desc: 'Apartments direct from landlords. Never pay before viewing.' },
  { name: 'Brussels Foodies', platform: 'Facebook', members: '20,000+', url: 'https://www.facebook.com/groups/brusselsfoodies/', desc: 'Restaurant recommendations and food events.' },
  { name: 'Meetup Brussels', platform: 'Meetup', members: 'Various', url: 'https://www.meetup.com/find/?location=Brussels&source=EVENTS', desc: 'Language exchanges, hiking, tech meetups, board games.' },
  { name: 'Brussels Times', platform: 'News', members: null, url: 'https://www.brusselstimes.com/', desc: 'English-language Belgian news.' },
  { name: 'The Bulletin', platform: 'News', members: null, url: 'https://www.thebulletin.be/', desc: 'English-language magazine on Belgian life and culture.' },
] as const

export const SEED_POSTS = [
  { id: 's1', commune: 'Ixelles', category: 'recommendation' as const, text: 'La Quincaillerie on rue du Page — still the best brunch in the area. Book ahead on weekends.', time: '2h ago' },
  { id: 's2', commune: 'Ixelles', category: 'heads-up' as const, text: 'Rue Lesbroussart resurfacing starts next week. Expect detours near Flagey.', time: '5h ago' },
  { id: 's3', commune: 'Saint-Gilles', category: 'question' as const, text: 'Anyone know a good locksmith near Parvis? Locked out twice this month.', time: '1d ago' },
  { id: 's4', commune: 'Saint-Gilles', category: 'recommendation' as const, text: 'Le Phare du Kanaal for afternoon coffee. Quiet, good wifi, canal views.', time: '3h ago' },
  { id: 's5', commune: 'Etterbeek', category: 'heads-up' as const, text: 'Commune registration is walk-in only on Tuesdays. Book online for other days.', time: '4h ago' },
  { id: 's6', commune: 'Etterbeek', category: 'recommendation' as const, text: 'Dr. Van den Berg on Avenue de Tervueren speaks perfect English. Taking new patients.', time: '2d ago' },
  { id: 's7', commune: 'Schaerbeek', category: 'question' as const, text: 'Is the Saturday market at Colignon still running?', time: '6h ago' },
  { id: 's8', commune: 'Schaerbeek', category: 'recommendation' as const, text: 'Josaphat park on Sunday mornings is incredibly peaceful. Best kept secret.', time: '1d ago' },
  { id: 's9', commune: 'Uccle', category: 'heads-up' as const, text: 'New bike lane on Avenue Churchill is finally open.', time: '8h ago' },
  { id: 's10', commune: 'Woluwe-Saint-Lambert', category: 'recommendation' as const, text: 'Great Asian supermarket on the lower level of Woluwe shopping centre.', time: '3d ago' },
  { id: 's11', commune: 'Bruxelles-Ville', category: 'question' as const, text: 'Best coworking space near Grand Place?', time: '4h ago' },
  { id: 's12', commune: 'Forest', category: 'recommendation' as const, text: 'Altitude Cent neighbourhood is genuinely underrated. Great bakeries and tram 7 gets you anywhere.', time: '1d ago' },
] as const

export const CITY_COSTS = {
  'London': { rent: 2100, utils: 220, food: 450, transport: 160, dining: 350 },
  'Paris': { rent: 1400, utils: 180, food: 380, transport: 85, dining: 280 },
  'Amsterdam': { rent: 1800, utils: 200, food: 350, transport: 100, dining: 300 },
  'New York': { rent: 3200, utils: 180, food: 500, transport: 130, dining: 400 },
  'Berlin': { rent: 1100, utils: 250, food: 300, transport: 86, dining: 200 },
  'Dublin': { rent: 2000, utils: 200, food: 380, transport: 120, dining: 320 },
  'Munich': { rent: 1600, utils: 230, food: 330, transport: 60, dining: 250 },
  'Zurich': { rent: 2400, utils: 200, food: 500, transport: 90, dining: 400 },
  'Madrid': { rent: 1200, utils: 150, food: 300, transport: 55, dining: 220 },
  'Copenhagen': { rent: 1700, utils: 180, food: 400, transport: 70, dining: 320 },
} as const

export const BRUSSELS_COSTS = { rent: 1050, utils: 160, food: 320, transport: 49, dining: 200 } as const

export const MONTHLY_COSTS_ITEMS = [
  { key: 'rent', label: 'Rent (1BR)', budget: 800, moderate: 1050, comfortable: 1300 },
  { key: 'utils', label: 'Utilities', budget: 120, moderate: 160, comfortable: 200 },
  { key: 'telecom', label: 'Internet and phone', budget: 50, moderate: 65, comfortable: 80 },
  { key: 'transport', label: 'STIB monthly pass', budget: 49, moderate: 49, comfortable: 49 },
  { key: 'food', label: 'Groceries', budget: 250, moderate: 320, comfortable: 400 },
  { key: 'dining', label: 'Eating out', budget: 100, moderate: 200, comfortable: 350 },
  { key: 'health', label: 'Mutuelle', budget: 10, moderate: 12, comfortable: 15 },
  { key: 'misc', label: 'Misc and buffer', budget: 150, moderate: 200, comfortable: 300 },
] as const

export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
] as const

export const HOUSING_LINKS = [
  { name: 'Immoweb', url: 'https://www.immoweb.be/en/search/apartment/for-rent?countries=BE&postalCodes=BE-BRU', desc: "Belgium's largest property site. Start here." },
  { name: 'Zimmo', url: 'https://www.zimmo.be/en/', desc: 'Aggregator that catches listings Immoweb misses.' },
  { name: 'Spotahome', url: 'https://www.spotahome.com/brussels', desc: 'Book remotely without visiting. Good for arrivals.' },
  { name: 'HousingAnywhere', url: 'https://housinganywhere.com/s/Brussels--Belgium', desc: 'Furnished mid-term rentals.' },
  { name: 'Facebook Housing Groups', url: 'https://www.facebook.com/groups/brusselshousing/', desc: 'Direct from landlords. Never pay before viewing.' },
] as const

export const LANDMARKS = [
  { name: 'EU Quarter', lat: 50.843, lng: 4.382 },
  { name: 'Grand Place', lat: 50.847, lng: 4.352 },
  { name: 'Cinquantenaire', lat: 50.840, lng: 4.393 },
  { name: 'Place Flagey', lat: 50.827, lng: 4.372 },
  { name: 'NATO HQ', lat: 50.876, lng: 4.424 },
  { name: 'Brussels-Midi', lat: 50.836, lng: 4.337 },
] as const

export const WEATHER_CODES: Record<number, string> = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Icy fog', 51: 'Light drizzle', 53: 'Drizzle',
  55: 'Heavy drizzle', 61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Moderate snow', 75: 'Heavy snow',
  80: 'Rain showers', 81: 'Showers', 82: 'Heavy showers',
  95: 'Thunderstorm', 96: 'Thunderstorm + hail',
}

export const FEATURED_QUESTIONS = [
  { slug: 'how-to-register-commune', question: 'How do I register at my commune?' },
  { slug: 'which-neighbourhood', question: 'Which Brussels neighbourhood should I live in?' },
  { slug: 'cost-of-living', question: 'How much does it cost to live here?' },
  { slug: 'landlord-wont-fix', question: 'My landlord will not fix something. What are my options?' },
  { slug: 'find-english-doctor', question: 'Where do I find an English-speaking doctor?' },
]

export const SETUP_CHECKLIST = [
  {
    phase: 'Before you arrive',
    intro: 'Get these sorted before landing. It makes the first week much easier.',
    items: [
      {
        id: 'temp-accommodation',
        label: 'Arrange temporary accommodation for your first 2 to 4 weeks',
        desc: 'Having a place to land makes everything less stressful. Many people use Spotahome or HousingAnywhere for furnished short-term options.',
        tip: 'Book flexible cancellation if your plans might change.',
        links: [
          { text: 'Spotahome', url: 'https://www.spotahome.com/brussels' },
          { text: 'HousingAnywhere', url: 'https://housinganywhere.com/s/Brussels--Belgium' },
        ],
      },
      {
        id: 'visa-check',
        label: 'Check visa and work permit requirements',
        desc: 'EU citizens can move freely. Non-EU citizens: your employer usually handles the work permit application, but confirm timelines early.',
        tip: 'Start this as soon as you have a job offer. The Single Permit process takes 3 to 4 months.',
        links: [] as { text: string; url: string }[],
      },
      {
        id: 'apostille',
        label: 'Get apostille on birth certificate if non-EU',
        desc: 'This official stamp from your home country is required for commune registration. It can take several weeks to obtain.',
        tip: 'Request it before you leave — you cannot get it from Brussels.',
        links: [] as { text: string; url: string }[],
      },
      {
        id: 'apps',
        label: 'Download STIB and Doctena apps',
        desc: 'STIB is the Brussels public transport app. Doctena helps you find and book doctors, many of whom speak English.',
        tip: 'Having these ready on arrival saves immediate headaches.',
        links: [
          { text: 'STIB', url: 'https://www.stib-mivb.be/' },
          { text: 'Doctena', url: 'https://www.doctena.be/' },
        ],
      },
    ],
  },
  {
    phase: 'Week one',
    intro: 'The essentials. Get these done and everything else becomes easier.',
    items: [
      {
        id: 'etat-des-lieux',
        label: 'Sign rental contract and complete the etat des lieux',
        desc: 'The etat des lieux is the condition report for your apartment. It protects you when you move out.',
        tip: 'Photograph absolutely everything. Scratches, marks, appliance conditions. This document determines whether you get your deposit back.',
        links: [] as { text: string; url: string }[],
      },
      {
        id: 'commune-register',
        label: 'Register at your commune within 8 working days',
        desc: 'Every person living in Belgium must register at their local commune. Bring your passport, rental contract, and passport photos.',
        tip: 'Book your appointment online if possible. Walk-in queues at Ixelles and Saint-Gilles can be over an hour.',
        links: [] as { text: string; url: string }[],
      },
      {
        id: 'bank-account',
        label: 'Open a Belgian bank account',
        desc: 'You need a Belgian bank account for rent, salary, and daily transactions. Main options: BNP Paribas Fortis, KBC, ING, Belfius.',
        tip: 'Bring your passport, commune registration receipt, and employment contract. Some banks open accounts same day.',
        links: [] as { text: string; url: string }[],
      },
      {
        id: 'utilities',
        label: 'Set up utilities and internet',
        desc: 'Contact your energy provider for electricity and gas. Arrange internet separately through Proximus, Telenet, or Orange.',
        tip: 'Ask your landlord for the EAN meter numbers. Internet installation typically takes 1 to 2 weeks.',
        links: [] as { text: string; url: string }[],
      },
      {
        id: 'rental-guarantee',
        label: 'Register rental guarantee in a blocked bank account',
        desc: 'Belgian law requires 2 to 3 months rent as a deposit, held in a blocked account at a bank. Never pay the deposit directly to the landlord.',
        tip: 'Your bank can set this up when you open your account.',
        links: [] as { text: string; url: string }[],
      },
    ],
  },
  {
    phase: 'First month',
    intro: 'Healthcare, transport, and settling in.',
    items: [
      {
        id: 'mutuelle',
        label: 'Join a mutuelle within 3 months of starting work',
        desc: 'A mutuelle is the Belgian health insurance top-up. It covers a portion of your medical costs. Main options: Partenamut, Solidaris, CM.',
        tip: 'Bring your Annex 8 or eID and your employer NSSO number.',
        links: [] as { text: string; url: string }[],
      },
      {
        id: 'gp-register',
        label: 'Register with a GP',
        desc: 'Find and register with a general practitioner near your home. Many doctors in central Brussels speak English.',
        tip: 'Use Doctena to search by language and location.',
        links: [
          { text: 'Doctena', url: 'https://www.doctena.be/' },
        ],
      },
      {
        id: 'mobib',
        label: 'Get a MOBIB card and set up STIB monthly pass',
        desc: 'MOBIB is the rechargeable transport card for Brussels. Monthly pass is 49 euros. Available at any metro station.',
        tip: 'Check if your employer covers transport costs via the third-party payer scheme.',
        links: [
          { text: 'STIB', url: 'https://www.stib-mivb.be/' },
        ],
      },
      {
        id: 'police-visit',
        label: 'Be home for the police verification visit',
        desc: 'After commune registration, a local police officer will visit your address to confirm you live there. This usually happens within 2 weeks.',
        tip: 'They may not call ahead. Try to be home during daytime hours.',
        links: [] as { text: string; url: string }[],
      },
      {
        id: 'eid-collect',
        label: 'Collect your eID or residence card from the commune',
        desc: 'Once the police verify your address, the commune will notify you to collect your Belgian residence card. Takes 2 to 4 weeks.',
        tip: 'Bring your passport and any receipt from your initial registration.',
        links: [] as { text: string; url: string }[],
      },
    ],
  },
  {
    phase: 'First 90 days',
    intro: "The longer-term admin. No rush, but don't forget.",
    items: [
      {
        id: 'tax-register',
        label: 'Register with the Belgian tax authority via MyMinfin',
        desc: 'You will need to file a Belgian tax return. MyMinfin is the official platform. If you qualify for the Belgian expat tax regime, apply within 3 months of starting work.',
        tip: 'Consider hiring a tax advisor for your first year. It typically costs 200 to 500 euros and avoids mistakes.',
        links: [
          { text: 'MyMinfin', url: 'https://eservices.minfin.fgov.be/myminfin-web/' },
        ],
      },
      {
        id: 'lease-register',
        label: 'Register your lease at MyRent',
        desc: 'Belgian leases should be registered at the tax office. This is free and takes about 5 minutes online. Your landlord may have already done this.',
        tip: 'If your landlord has not registered it, do it yourself to protect your rights.',
        links: [
          { text: 'MyRent', url: 'https://financien.belgium.be/en/private-individuals/housing/renting/registration' },
        ],
      },
      {
        id: 'language-classes',
        label: 'Enrol in French or Dutch classes',
        desc: 'Many communes offer free or subsidised language courses for residents. Private options include Alliance Francaise and CVO Brussel.',
        tip: 'Even basic French dramatically improves daily life in Brussels.',
        links: [] as { text: string; url: string }[],
      },
    ],
  },
]
