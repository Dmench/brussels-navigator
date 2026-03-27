// ─── Events 2026 ──────────────────────────────────────────────────────────────

export const EVENTS_2026 = [
  { date: '2026-01-01', title: "New Year's Day", type: 'holiday' as const, desc: 'Public holiday. Most shops and services closed.' },
  { date: '2026-04-06', title: 'Easter Monday', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-05-01', title: 'Labour Day', type: 'holiday' as const, desc: 'Public holiday. Union demonstrations in city center.' },
  { date: '2026-05-14', title: 'Ascension Day', type: 'holiday' as const, desc: 'Public holiday. Thursday — many take the Friday off.' },
  { date: '2026-05-25', title: 'Whit Monday', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-07-21', title: 'Belgian National Day', type: 'holiday' as const, desc: 'Military parade, fireworks at Cinquantenaire, free concerts.' },
  { date: '2026-08-15', title: 'Assumption of Mary', type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-11-01', title: "All Saints' Day", type: 'holiday' as const, desc: 'Public holiday.' },
  { date: '2026-11-11', title: 'Armistice Day', type: 'holiday' as const, desc: 'Public holiday. Ceremonies at the Tomb of the Unknown Soldier.' },
  { date: '2026-12-25', title: 'Christmas Day', type: 'holiday' as const, desc: 'Public holiday. Everything closed.' },
  { date: '2026-05-31', title: 'Brussels 20km', type: 'event' as const, desc: '38,000 runners through Cinquantenaire and the Royal Palace. Register at 20kmdebruxelles.be.' },
  { date: '2026-06-21', title: 'Fête de la Musique', type: 'event' as const, desc: 'Free live music across the city. Stages at Flagey, Grand Place, and Saint-Géry.' },
  { date: '2026-06-26', title: 'Couleur Café', type: 'event' as const, desc: 'Three-day music festival at Osseghem Park near the Atomium. June 26–28.' },
  { date: '2026-07-01', title: 'Summer sales begin', type: 'event' as const, desc: 'Official start of the summer sales period. Approximately four weeks.' },
  { date: '2026-09-20', title: 'Car-Free Sunday', type: 'event' as const, desc: 'The entire Brussels Region goes car-free from 9:30am to 7pm. Public transport is free.' },
  { date: '2026-12-06', title: 'Saint-Nicolas', type: 'event' as const, desc: 'Belgian gift-giving tradition for children. Not an official holiday.' },
  { date: '2026-11-02', title: 'Brussels Marathon', type: 'event' as const, desc: 'Early November. Marathon, half-marathon, and 7km. Confirm at brusselsairportmarathon.be.' },
  { date: '2026-11-27', title: "Plaisirs d'Hiver", type: 'event' as const, desc: 'Christmas market at Grand Place. Ice rink and light show. Approximately six weeks.' },
  { date: '2026-07-11', title: 'Flemish Community Day', type: 'info' as const, desc: 'Not a Brussels public holiday. Some offices and businesses close.' },
  { date: '2026-10-01', title: 'Health insurance check', type: 'info' as const, desc: 'Review your mutuelle membership and annual fees before the new year.' },
] as const

// ─── Communes ─────────────────────────────────────────────────────────────────

export const COMMUNES = [
  { id: 'ixelles', name: 'Ixelles', rent: 1100, vibe: 'Cosmopolitan and lively', expat: 5, transit: 5, green: 3, safety: 4, walk: 5, desc: 'The heart of expat Brussels. Home to ULB, Place Flagey, and some of the best restaurants in the city. Expensive but central.', lat: 50.827, lng: 4.371, immoweb: 'ixelles' },
  { id: 'etterbeek', name: 'Etterbeek', rent: 950, vibe: 'Quiet and well-connected', expat: 4, transit: 4, green: 3, safety: 4, walk: 4, desc: 'Adjacent to the EU quarter with easy access to Cinquantenaire park. Good value for the location.', lat: 50.836, lng: 4.389, immoweb: 'etterbeek' },
  { id: 'saint-gilles', name: 'Saint-Gilles', rent: 900, vibe: 'Artsy and diverse', expat: 4, transit: 4, green: 2, safety: 3, walk: 5, desc: 'The most character per square metre in Brussels. Art nouveau architecture, the Parvis market, and excellent bars.', lat: 50.826, lng: 4.346, immoweb: 'saint-gilles' },
  { id: 'schaerbeek', name: 'Schaerbeek', rent: 800, vibe: 'Up-and-coming', expat: 3, transit: 4, green: 3, safety: 3, walk: 3, desc: 'Rapidly gentrifying with beautiful townhouses and good value. Josaphat park is a hidden gem.', lat: 50.862, lng: 4.378, immoweb: 'schaerbeek' },
  { id: 'woluwe-sl', name: 'Woluwe-Saint-Lambert', rent: 1050, vibe: 'Green and family-friendly', expat: 4, transit: 3, green: 5, safety: 5, walk: 3, desc: 'Quiet, leafy, and close to international schools. Ideal for families.', lat: 50.842, lng: 4.430, immoweb: 'woluwe-saint-lambert' },
  { id: 'uccle', name: 'Uccle', rent: 1200, vibe: 'Upscale and residential', expat: 4, transit: 3, green: 5, safety: 5, walk: 3, desc: 'Near Bois de la Cambre and Fort Jaco. Spacious, green, and quiet — but you pay for it.', lat: 50.800, lng: 4.340, immoweb: 'uccle' },
  { id: 'forest', name: 'Forest', rent: 850, vibe: 'Residential and emerging', expat: 2, transit: 3, green: 4, safety: 4, walk: 3, desc: 'The Altitude Cent area is excellent. Home to Wiels contemporary art centre. Still affordable.', lat: 50.810, lng: 4.324, immoweb: 'forest' },
  { id: 'auderghem', name: 'Auderghem', rent: 950, vibe: 'Quiet and forested', expat: 3, transit: 3, green: 5, safety: 5, walk: 2, desc: 'On the edge of the Sonian Forest. Close to EU institutions but feels suburban.', lat: 50.814, lng: 4.427, immoweb: 'auderghem' },
  { id: 'bruxelles', name: 'Bruxelles-Ville', rent: 1050, vibe: 'Central and varied', expat: 4, transit: 5, green: 2, safety: 3, walk: 5, desc: 'Grand Place, Dansaert, Sainte-Catherine. Very central. Quality varies enormously by street.', lat: 50.847, lng: 4.352, immoweb: 'bruxelles' },
  { id: 'woluwe-sp', name: 'Woluwe-Saint-Pierre', rent: 1150, vibe: 'Quiet and upscale', expat: 4, transit: 3, green: 5, safety: 5, walk: 3, desc: 'Parc de Woluwe, Stockel village, and several international schools. Calm family living.', lat: 50.831, lng: 4.441, immoweb: 'woluwe-saint-pierre' },
] as const

// ─── Checklist ────────────────────────────────────────────────────────────────

export const CHECKLIST = [
  {
    cat: 'Before you arrive',
    items: [
      { id: 'housing', label: 'Secure accommodation', desc: 'Book a short-term rental (Airbnb, HousingAnywhere) for at least 3–4 weeks while you find a permanent apartment. Never sign a long lease remotely without viewing.' },
      { id: 'bank-home', label: 'Notify your home bank', desc: 'Tell your bank you are moving abroad. Set up Wise or Revolut for international transfers — Belgian fees are high.' },
      { id: 'docs', label: 'Prepare your documents', desc: 'Valid ID/passport, multiple passport photos, birth certificate (apostilled for non-EU), employment contract, university enrollment letter if student.' },
    ],
  },
  {
    cat: 'Week one',
    items: [
      { id: 'commune', label: 'Register at your commune', desc: 'Go to your local commune with your rental contract and documents. Book an appointment online — Ixelles and Saint-Gilles are busy. The process takes 4–6 weeks total.' },
      { id: 'stib', label: 'Get a STIB/MIVB card', desc: 'Buy an MPass MOBIB card for unlimited metro, tram, and bus travel. Monthly pass is ~€50. Available at STIB kiosks in major metro stations.' },
      { id: 'sim', label: 'Get a Belgian SIM card', desc: 'Proximus, Orange, and Base are the main operators. Base/Telenet offers the best value for data. Bring your passport to buy a SIM.' },
    ],
  },
  {
    cat: 'First month',
    items: [
      { id: 'bank', label: 'Open a Belgian bank account', desc: 'BNP Paribas Fortis and ING are most common. Belfius is popular with expats. Bring your registration document (Annexe 8 or residence card) and proof of address.' },
      { id: 'mutuelle', label: 'Join a health insurance fund', desc: 'Mandatory within 3 months of starting work. Choose a mutuelle: Mutualité Chrétienne, Solidaris, or the neutral CAAMI. Bring your contract and national register number.' },
      { id: 'utilities', label: 'Set up utilities', desc: 'Electricity and gas via Sibelga (fixed-network manager, Brussels Region). Compare suppliers on brugel.brussels. Internet: Orange, Proximus, or Telenet.' },
      { id: 'employer', label: 'Complete employer paperwork', desc: 'Dimona declaration (social security registration), single permit application if non-EU, NSSO registration. Usually handled by HR — follow up actively.' },
    ],
  },
  {
    cat: 'First 90 days',
    items: [
      { id: 'eid', label: 'Collect your eID or residence card', desc: 'After the commune police visit, you will be called to collect your Belgian ID card. Bring the collection notice and your passport.' },
      { id: 'tax', label: 'Check tax obligations', desc: 'Belgian tax return is filed between May and June for the previous year. First return is often done by the employer or a tax advisor — especially important in year of arrival.' },
      { id: 'doctor', label: 'Register with a GP', desc: 'Find a "médecin généraliste" (general practitioner) near you. Registration gives you preferential rates. Some practices are English-speaking — see expat.brussels.' },
      { id: 'explore', label: 'Explore your neighbourhood', desc: 'Visit your local market (every commune has one), find your nearest SPAR or Carrefour, and take a tram to the Grand Place. Brussels rewards those who walk.' },
    ],
  },
] as const

// ─── Templates ────────────────────────────────────────────────────────────────

export const TEMPLATES = [
  {
    id: 'landlord-checkin',
    title: 'Moving in notice to landlord',
    category: 'Housing',
    tier: 'free' as const,
    desc: 'Formal notification that you have taken up residence, as required by Belgian tenancy law.',
    en: `{Your Name}
{Your Address}
{City, Postcode}

{Date}

Dear {Landlord Name},

I am writing to confirm that I have taken up residence at {Property Address} as of {Move-in Date}, in accordance with the tenancy agreement signed on {Contract Date}.

I will arrange the transfer of utility accounts to my name as required. Please confirm receipt of this letter and advise of any outstanding administrative requirements.

Yours faithfully,
{Your Name}`,
    fr: `{Votre Nom}
{Votre Adresse}
{Ville, Code Postal}

{Date}

Madame, Monsieur {Nom du Propriétaire},

J'ai l'honneur de vous informer que j'ai pris résidence à {Adresse du Bien} à compter du {Date d'entrée}, conformément au bail signé le {Date du Contrat}.

Je procéderai au transfert des abonnements aux services publics à mon nom comme requis. Je vous serais reconnaissant(e) de bien vouloir accuser réception de la présente lettre.

Veuillez agréer l'expression de mes salutations distinguées,
{Votre Nom}`,
  },
  {
    id: 'commune-registration',
    title: 'Commune registration request',
    category: 'Administration',
    tier: 'free' as const,
    desc: 'Cover letter to accompany your commune registration dossier.',
    en: `{Your Name}
{Your Address}
{City, Postcode}

{Date}

To the Municipal Administration of {Commune Name},

I hereby request registration in the municipal registers at my address of {Full Address}, where I have resided since {Date of Arrival}.

I enclose the following documents: passport/national ID card; rental contract; {additional documents as applicable}.

Please advise if further documentation is required.

Yours faithfully,
{Your Name}`,
    fr: `{Votre Nom}
{Votre Adresse}
{Ville, Code Postal}

{Date}

À l'Administration Communale de {Nom de la Commune},

J'ai l'honneur de solliciter mon inscription dans les registres communaux à l'adresse suivante : {Adresse Complète}, où je réside depuis le {Date d'Arrivée}.

Je joins les documents suivants : passeport / carte d'identité nationale ; contrat de bail ; {documents complémentaires le cas échéant}.

Dans l'attente de votre réponse, veuillez agréer l'expression de mes salutations distinguées,
{Votre Nom}`,
  },
  {
    id: 'landlord-deposit',
    title: 'Rental deposit claim letter',
    category: 'Housing',
    tier: 'pro' as const,
    desc: 'Request return of rental deposit at end of tenancy.',
    en: `{Your Name}\n{Address}\n\nDear {Landlord},\n\nThis letter formally requests the return of my rental deposit of €{Amount} within the statutory period following vacation of {Property Address} on {Date}.`,
    fr: `{Votre Nom}\n{Adresse}\n\nMadame, Monsieur,\n\nJe vous demande par la présente le remboursement de ma garantie locative de {Montant}€ dans les délais légaux suite à mon départ de {Adresse} le {Date}.`,
  },
  {
    id: 'employer-domicile',
    title: 'Employer address confirmation',
    category: 'Administration',
    tier: 'pro' as const,
    desc: 'Request from your employer confirming your Belgian address for administrative purposes.',
    en: `Dear {HR Contact},\n\nI require a letter confirming my current Belgian address and employment details for commune registration purposes. Please issue this on company letterhead at your earliest convenience.`,
    fr: `Madame, Monsieur,\n\nJe souhaiterais obtenir une attestation d'adresse et d'emploi sur papier à en-tête de la société, nécessaire pour mon inscription communale.`,
  },
  {
    id: 'utility-setup',
    title: 'Utility account transfer request',
    category: 'Housing',
    tier: 'pro' as const,
    desc: 'Transfer electricity and gas accounts from previous tenant.',
    en: `To Sibelga / {Supplier Name},\n\nI write to request transfer of the electricity and gas supply for {Address} to my name, effective {Date}. My details: {Full Name}, {National Register Number or Date of Birth}.`,
    fr: `À Sibelga / {Fournisseur},\n\nJe sollicite le transfert de l'abonnement électricité et gaz pour {Adresse} à mon nom à compter du {Date}. Mes coordonnées : {Nom Complet}, {Numéro de Registre National ou Date de Naissance}.`,
  },
  {
    id: 'mutuelle-join',
    title: 'Mutuelle membership request',
    category: 'Healthcare',
    tier: 'pro' as const,
    desc: 'Formal application to join a Belgian health insurance fund.',
    en: `Dear {Mutuelle Name},\n\nI wish to apply for membership of {Mutuelle Name} with effect from {Start Date}. I am employed at {Employer} and my Belgian national register number is {Number}. Please advise on the required documentation.`,
    fr: `Madame, Monsieur,\n\nJe souhaite m'affilier à {Nom de la Mutuelle} à compter du {Date de Début}. Je suis employé(e) chez {Employeur} et mon numéro de registre national est le {Numéro}. Merci de m'indiquer les documents à fournir.`,
  },
  {
    id: 'lease-termination',
    title: 'Lease termination notice',
    category: 'Housing',
    tier: 'pro' as const,
    desc: 'Three-month notice of intention to terminate rental agreement.',
    en: `{Your Name}\n{Address}\n\nDear {Landlord},\n\nIn accordance with Article 237 of the Flemish Housing Code / Article 11 of the Walloon Housing Code / the Brussels Housing Code, I hereby give three months' notice of my intention to vacate {Property Address}, effective {Termination Date}.`,
    fr: `{Votre Nom}\n{Adresse}\n\nMadame, Monsieur,\n\nConformément aux dispositions légales applicables, je vous notifie par la présente mon intention de quitter le bien sis {Adresse} avec un préavis de trois mois, prenant effet le {Date d'Effet}.`,
  },
] as const

// ─── Monthly Costs ─────────────────────────────────────────────────────────────

export const MONTHLY_COSTS = [
  { label: 'Rent (1-bed)', budget: 800, moderate: 1050, comfortable: 1300 },
  { label: 'Utilities', budget: 100, moderate: 150, comfortable: 200 },
  { label: 'Groceries', budget: 250, moderate: 350, comfortable: 500 },
  { label: 'Eating out', budget: 100, moderate: 250, comfortable: 450 },
  { label: 'Transport', budget: 55, moderate: 80, comfortable: 120 },
  { label: 'Health insurance', budget: 60, moderate: 80, comfortable: 120 },
  { label: 'Phone / internet', budget: 60, moderate: 80, comfortable: 100 },
  { label: 'Entertainment', budget: 80, moderate: 150, comfortable: 300 },
  { label: 'Misc / savings buffer', budget: 150, moderate: 200, comfortable: 300 },
] as const

// ─── Currencies ───────────────────────────────────────────────────────────────

export const CURRENCIES = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'CHF', label: 'Swiss Franc', symbol: 'Fr' },
  { code: 'PLN', label: 'Polish Złoty', symbol: 'zł' },
  { code: 'SEK', label: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', label: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', label: 'Danish Krone', symbol: 'kr' },
  { code: 'CZK', label: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', label: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RON', label: 'Romanian Leu', symbol: 'lei' },
  { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', label: 'Brazilian Real', symbol: 'R$' },
] as const

// ─── Housing Links ────────────────────────────────────────────────────────────

export const HOUSING_LINKS = [
  { name: 'Immoweb', url: 'https://www.immoweb.be/en/search/apartment/for-rent?countries=BE&orderBy=relevance', desc: 'Belgium\'s largest property platform. Most listings appear here first.' },
  { name: 'Zimmo', url: 'https://www.zimmo.be/en/rent/apartment/', desc: 'Aggregates from multiple sources. Often catches listings Immoweb misses.' },
  { name: 'Spotahome', url: 'https://www.spotahome.com/rent/apartments/brussels-brussels-capital-region-belgium', desc: 'Furnished apartments. Verified listings with video tours. Good for arriving expats.' },
  { name: 'HousingAnywhere', url: 'https://housinganywhere.com/Brussels--Belgium/apartments-for-rent', desc: 'Mid-term furnished rentals. Popular with EU institution staff.' },
  { name: 'Facebook Housing Groups', url: 'https://www.facebook.com/groups/brusselshousing', desc: 'Direct-from-owner listings. Move fast — check multiple times daily.' },
] as const

// ─── Communities ──────────────────────────────────────────────────────────────

export const COMMUNITIES = [
  { name: 'r/brussels', platform: 'Reddit', members: '95k', url: 'https://www.reddit.com/r/brussels/', desc: 'Brussels subreddit — practical questions, local news, recommendations.' },
  { name: 'r/belgium', platform: 'Reddit', members: '220k', url: 'https://www.reddit.com/r/belgium/', desc: 'Belgium-wide. Good for administrative questions and national news.' },
  { name: 'Expats in Brussels', platform: 'Facebook', members: '48k', url: 'https://www.facebook.com/groups/expatsinbrussels/', desc: 'Largest English-language expat group. Housing, events, and questions.' },
  { name: 'InterNations Brussels', platform: 'InterNations', members: '40k', url: 'https://www.internations.org/brussels-expats/', desc: 'Organised events for expats. Paid membership for full access.' },
  { name: 'Brussels Expats Meetup', platform: 'Meetup', members: '12k', url: 'https://www.meetup.com/brussels-expats/', desc: 'Monthly social events, language exchanges, and networking.' },
  { name: 'The Bulletin', platform: 'Website', members: null, url: 'https://www.thebulletin.be', desc: 'English-language news magazine covering Belgium. Essential reading.' },
  { name: 'Politico Brussels Playbook', platform: 'Newsletter', members: null, url: 'https://www.politico.eu/newsletter/brussels-playbook/', desc: 'Morning briefing on EU politics. Free, daily, very widely read in the EU bubble.' },
  { name: 'expat.brussels', platform: 'Official', members: null, url: 'https://www.expat.brussels', desc: 'Official Brussels Capital Region guide for newcomers. Reliable and comprehensive.' },
] as const

// ─── Profiles ─────────────────────────────────────────────────────────────────

export const PROFILES = {
  eu: {
    label: 'EU Professional',
    desc: 'EU citizen working in Brussels',
    top_communes: ['etterbeek', 'ixelles', 'woluwe-sl'],
    checklist_notes: {
      commune: 'As an EU citizen, you only need your passport and proof of address to register. No work permit required.',
      mutuelle: 'EU citizens access Belgian healthcare via their employer\'s social security contributions. Join within 3 months of starting work.',
      bank: 'Open a Belgian account quickly — some employers require it within the first month for salary payment.',
    },
  },
  'non-eu': {
    label: 'Non-EU Professional',
    desc: 'Work permit holder or relocating expat',
    top_communes: ['ixelles', 'etterbeek', 'bruxelles'],
    checklist_notes: {
      commune: 'You will need your Single Permit (or Annex 46 document) for commune registration. Your employer applies for this before you arrive.',
      mutuelle: 'Same process as EU citizens. Join within 3 months of your NSSO registration.',
      bank: 'Some banks require a national register number (obtained after commune registration) before opening an account. Belfius and BNP are most flexible.',
    },
  },
  student: {
    label: 'Student / Trainee',
    desc: 'Studying or interning in Brussels',
    top_communes: ['ixelles', 'saint-gilles', 'schaerbeek'],
    checklist_notes: {
      commune: 'University enrollment letter is your primary document alongside your ID. Some communes have a dedicated student desk.',
      mutuelle: 'Students under 25 can often remain on parental health insurance. Check before joining a new mutuelle.',
      bank: 'KBC and BNP offer student accounts with reduced fees. Bring your student card and enrollment letter.',
    },
  },
} as const

// ─── Plan Questions ────────────────────────────────────────────────────────────

export const PLAN_QUESTIONS = [
  {
    id: 'profile',
    question: 'What brings you to Brussels?',
    options: [
      { value: 'eu', label: 'EU institution or agency' },
      { value: 'non-eu', label: 'Private sector or international org' },
      { value: 'student', label: 'Studying or on a traineeship' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your monthly housing budget?',
    options: [
      { value: 'budget', label: 'Under €900' },
      { value: 'moderate', label: '€900 to €1,200' },
      { value: 'comfortable', label: 'Over €1,200' },
    ],
  },
  {
    id: 'vibe',
    question: 'What kind of neighbourhood do you prefer?',
    options: [
      { value: 'urban', label: 'Central, lively, walkable' },
      { value: 'residential', label: 'Quiet, residential, green' },
      { value: 'eclectic', label: 'Character, diversity, arts' },
    ],
  },
  {
    id: 'commute',
    question: 'How important is proximity to EU institutions?',
    options: [
      { value: 'essential', label: 'Essential — I work in the EU quarter' },
      { value: 'useful', label: 'Useful but not critical' },
      { value: 'irrelevant', label: 'Not relevant to me' },
    ],
  },
  {
    id: 'move_date',
    question: 'When are you planning to move?',
    type: 'month-picker' as const,
  },
] as const

// ─── Map Landmarks ────────────────────────────────────────────────────────────

export const MAP_LANDMARKS = [
  { name: 'Grand Place', lat: 50.846, lng: 4.352 },
  { name: 'EU Quarter / Schuman', lat: 50.844, lng: 4.378 },
  { name: 'Cinquantenaire', lat: 50.841, lng: 4.395 },
  { name: 'Flagey', lat: 50.826, lng: 4.374 },
  { name: 'NATO HQ', lat: 50.880, lng: 4.419 },
  { name: 'Brussels-Midi', lat: 50.836, lng: 4.336 },
] as const

// ─── Useful Links ────────────────────────────────────────────────────────────

export const USEFUL_LINKS = [
  { label: 'expat.brussels', url: 'https://www.expat.brussels', desc: 'Official newcomer guide from the Brussels Capital Region' },
  { label: 'MyMinfin / Tax-on-Web', url: 'https://www.myminfin.be', desc: 'Belgian tax filing portal' },
  { label: 'STIB/MIVB', url: 'https://www.stib-mivb.be', desc: 'Brussels public transport — tickets, schedules, disruptions' },
  { label: 'Brugel', url: 'https://www.brugel.brussels', desc: 'Brussels energy regulator — compare electricity suppliers' },
  { label: 'dofi.ibz.be', url: 'https://www.dofi.ibz.be', desc: 'Immigration Office — residency and permit information' },
  { label: 'health.belgium.be', url: 'https://www.health.belgium.be', desc: 'Federal health information and contact details' },
] as const

// ─── Nav Items ────────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { href: '/plan', label: 'Getting started' },
  { href: '/neighborhoods', label: 'Neighbourhoods' },
  { href: '/guides', label: 'Guides' },
  { href: '/events', label: 'This week' },
  { href: '/community', label: 'Community' },
] as const

export const ALL_NAV_ITEMS = [
  { href: '/plan', label: 'Plan builder', group: 'Getting started' },
  { href: '/checklist', label: 'Setup checklist', group: 'Getting started' },
  { href: '/calendar', label: 'Calendar 2026', group: 'Getting started' },
  { href: '/templates', label: 'Templates', group: 'Getting started' },
  { href: '/neighborhoods', label: 'Neighbourhoods', group: 'Explore' },
  { href: '/housing', label: 'Finding housing', group: 'Explore' },
  { href: '/costs', label: 'Cost calculator', group: 'Explore' },
  { href: '/map', label: 'Interactive map', group: 'Explore' },
  { href: '/guides', label: 'All guides', group: 'Guides' },
  { href: '/events', label: 'This week', group: 'Community' },
  { href: '/community', label: 'Communities', group: 'Community' },
] as const

// ─── Weather codes (WMO) ─────────────────────────────────────────────────────

export const WEATHER_CODES: Record<number, { label: string }> = {
  0: { label: 'Clear sky' },
  1: { label: 'Mainly clear' },
  2: { label: 'Partly cloudy' },
  3: { label: 'Overcast' },
  45: { label: 'Foggy' },
  48: { label: 'Icy fog' },
  51: { label: 'Light drizzle' },
  53: { label: 'Drizzle' },
  55: { label: 'Heavy drizzle' },
  61: { label: 'Light rain' },
  63: { label: 'Moderate rain' },
  65: { label: 'Heavy rain' },
  71: { label: 'Light snow' },
  73: { label: 'Moderate snow' },
  75: { label: 'Heavy snow' },
  80: { label: 'Rain showers' },
  81: { label: 'Moderate showers' },
  82: { label: 'Heavy showers' },
  95: { label: 'Thunderstorm' },
}

export function getWeatherLabel(code: number): string {
  return WEATHER_CODES[code]?.label ?? 'Variable'
}
