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
  { title: 'Flagey Market', day: 'Sunday', time: 'Morning', location: 'Place Flagey, Ixelles', desc: 'Weekly food and flower market.', category: 'markets' as const },
  { title: 'Jeu de Balle Flea Market', day: 'Daily', time: '6am–2pm', location: 'Place du Jeu de Balle, Marolles', desc: 'Legendary daily flea market. Best on weekends.', category: 'markets' as const },
  { title: 'Midi Market', day: 'Sunday', time: 'Morning', location: 'Gare du Midi', desc: 'Huge weekly market with food from around the world.', category: 'markets' as const },
  { title: 'Brussels Runners', day: 'Saturday', time: '10am', location: 'Bois de la Cambre', desc: 'Free weekly group run. All levels.', category: 'sports' as const },
  { title: 'Language Exchange — Café Belga', day: 'Wednesday', time: '7pm', location: 'Place Flagey, Ixelles', desc: 'Informal language exchange. FR, EN, NL and more.', category: 'networking' as const },
  { title: 'Drink and Draw Brussels', day: 'Monthly', time: 'Evening', location: 'Various', desc: 'Casual sketch meetup. Check Facebook for dates.', category: 'networking' as const },
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
  { name: 'Brussels Expats', platform: 'Facebook', members: '65,000+', url: 'https://www.facebook.com/groups/BrusselsExpats/', desc: 'Largest English-speaking expat group. Housing, admin, events, recommendations.' },
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
