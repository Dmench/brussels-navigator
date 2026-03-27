export type TemplateTier = 'free' | 'pro'

export interface TemplateField {
  key: string
  label: string
  placeholder: string
}

export interface Template {
  id: string
  title: string
  titleFr: string
  tier: TemplateTier
  fields: TemplateField[]
  body: string
  bodyFr: string
}

export interface TemplateCategory {
  id: string
  label: string
  labelFr: string
  topics: Template[]
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: 'landlord',
    label: 'Landlord',
    labelFr: 'Propriétaire',
    topics: [
      {
        id: 'landlord-intro',
        title: 'Introduce myself as a new tenant',
        titleFr: 'Me présenter comme nouveau locataire',
        tier: 'free',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'landlord_name', label: 'Landlord name', placeholder: 'Landlord or agency name' },
          { key: 'address', label: 'Property address', placeholder: 'Full address' },
          { key: 'move_date', label: 'Move-in date', placeholder: 'e.g. 1 April 2026' },
          { key: 'your_email', label: 'Your email', placeholder: 'your@email.com' },
          { key: 'your_phone', label: 'Your phone', placeholder: '+32 ...' },
        ],
        body: `Dear {landlord_name},

I am writing to introduce myself as the new tenant at {address}, where I moved in on {move_date}.

My name is {your_name}. I look forward to a smooth and respectful tenancy. Please do not hesitate to contact me for any matters related to the property.

My contact details:
Email: {your_email}
Phone: {your_phone}

Kind regards,
{your_name}`,
        bodyFr: `Madame, Monsieur {landlord_name},

Je me permets de me présenter en tant que nouveau locataire au {address}, où j'ai emménagé le {move_date}.

Je m'appelle {your_name}. Je me réjouis d'entretenir une relation de bail sereine et respectueuse. N'hésitez pas à me contacter pour toute question relative au logement.

Mes coordonnées :
E-mail : {your_email}
Téléphone : {your_phone}

Cordialement,
{your_name}`,
      },
      {
        id: 'landlord-repair',
        title: 'Request a repair',
        titleFr: 'Demander une réparation',
        tier: 'free',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'landlord_name', label: 'Landlord name', placeholder: 'Landlord or agency name' },
          { key: 'address', label: 'Property address', placeholder: 'Full address' },
          { key: 'issue', label: 'Describe the issue', placeholder: 'e.g. the boiler has stopped working' },
          { key: 'date_noticed', label: 'Date you noticed the problem', placeholder: 'e.g. 15 March 2026' },
          { key: 'deadline', label: 'Deadline for response', placeholder: 'e.g. within 15 days' },
        ],
        body: `Dear {landlord_name},

I am writing regarding the property at {address}, of which I am the tenant.

On {date_noticed}, I noticed the following issue: {issue}.

As this falls under the landlord's maintenance responsibilities under Belgian tenancy law, I kindly request that you arrange for repair within {deadline}.

Please confirm receipt of this letter and inform me of the planned repair date.

Kind regards,
{your_name}`,
        bodyFr: `Madame, Monsieur {landlord_name},

Je me permets de vous contacter concernant le bien sis au {address}, dont je suis locataire.

Le {date_noticed}, j'ai constaté le problème suivant : {issue}.

Cette réparation relevant de la responsabilité du bailleur en vertu de la législation locative belge, je vous prie de bien vouloir y faire procéder dans un délai de {deadline}.

Je vous remercie de bien vouloir accuser réception du présent courrier et de m'informer de la date d'intervention prévue.

Cordialement,
{your_name}`,
      },
      {
        id: 'landlord-deposit',
        title: 'Request deposit return',
        titleFr: 'Demander la restitution de la garantie locative',
        tier: 'pro',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'landlord_name', label: 'Landlord name', placeholder: 'Landlord or agency name' },
          { key: 'address', label: 'Property address', placeholder: 'Full address' },
          { key: 'departure_date', label: 'Departure date', placeholder: 'e.g. 31 March 2026' },
          { key: 'deposit_amount', label: 'Deposit amount', placeholder: 'e.g. EUR 2,100' },
          { key: 'bank_name', label: 'Bank where deposit is held', placeholder: 'e.g. BNP Paribas Fortis' },
        ],
        body: `Dear {landlord_name},

I vacated the property at {address} on {departure_date}. The exit état des lieux was completed jointly on that date.

The rental guarantee of {deposit_amount} held at {bank_name} should now be released. Please sign the release form and arrange for the funds to be returned to my account within the timeframe prescribed by Belgian law.

If you wish to raise any claims against the guarantee, please provide written documentation within 15 days of this letter.

Kind regards,
{your_name}`,
        bodyFr: `Madame, Monsieur {landlord_name},

J'ai quitté le bien situé au {address} le {departure_date}. L'état des lieux de sortie contradictoire a été réalisé à cette date.

La garantie locative de {deposit_amount} déposée auprès de {bank_name} doit désormais être libérée. Je vous prie de signer le formulaire de libération et de procéder au remboursement dans les délais légaux.

Si vous souhaitez formuler des réclamations sur la garantie, veuillez me fournir un justificatif écrit dans les 15 jours suivant la présente lettre.

Cordialement,
{your_name}`,
      },
      {
        id: 'landlord-lease-end',
        title: 'Give notice to end tenancy',
        titleFr: 'Donner congé',
        tier: 'pro',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'landlord_name', label: 'Landlord name', placeholder: 'Landlord or agency name' },
          { key: 'address', label: 'Property address', placeholder: 'Full address' },
          { key: 'notice_date', label: 'Date of this letter', placeholder: 'e.g. 28 March 2026' },
          { key: 'departure_date', label: 'Intended departure date', placeholder: 'e.g. 30 June 2026' },
          { key: 'lease_type', label: 'Lease type', placeholder: 'e.g. 9-year / short-term' },
        ],
        body: `Dear {landlord_name},

By this letter, dated {notice_date}, I hereby give formal notice to terminate my {lease_type} tenancy at {address}.

In accordance with Belgian tenancy law, I am providing three months' notice. My tenancy will therefore end on {departure_date}.

I will be in touch to arrange the exit état des lieux at a mutually convenient time.

Kind regards,
{your_name}`,
        bodyFr: `Madame, Monsieur {landlord_name},

Par la présente, datée du {notice_date}, je vous notifie formellement mon congé pour le bail {lease_type} portant sur le bien sis au {address}.

Conformément à la législation locative belge, je respecte un préavis de trois mois. Mon bail prendra donc fin le {departure_date}.

Je vous contacterai prochainement afin de convenir d'une date pour l'état des lieux de sortie.

Cordialement,
{your_name}`,
      },
    ],
  },
  {
    id: 'commune',
    label: 'Commune',
    labelFr: 'Commune',
    topics: [
      {
        id: 'commune-register',
        title: 'Register at my commune',
        titleFr: "M'inscrire à la commune",
        tier: 'free',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'commune_name', label: 'Commune name', placeholder: 'e.g. Ixelles / Etterbeek' },
          { key: 'address', label: 'New address', placeholder: 'Full address including postcode' },
          { key: 'move_date', label: 'Move-in date', placeholder: 'e.g. 1 April 2026' },
          { key: 'nationality', label: 'Nationality', placeholder: 'e.g. British / American' },
        ],
        body: `To the Administration communale de {commune_name},

I am writing to request registration at my new address in your commune.

My details:
Full name: {your_name}
New address: {address}
Move-in date: {move_date}
Nationality: {nationality}

I will bring the required documents (passport/ID, rental contract, passport photos) to my appointment. Please advise on any additional documentation required for my nationality.

Kind regards,
{your_name}`,
        bodyFr: `À l'Administration communale de {commune_name},

Je souhaite procéder à mon inscription à ma nouvelle adresse dans votre commune.

Mes coordonnées :
Nom complet : {your_name}
Nouvelle adresse : {address}
Date d'emménagement : {move_date}
Nationalité : {nationality}

Je me présenterai avec les documents requis (passeport/carte d'identité, contrat de bail, photos d'identité). Veuillez m'indiquer si des pièces supplémentaires sont nécessaires pour ma nationalité.

Cordialement,
{your_name}`,
      },
      {
        id: 'commune-address-change',
        title: 'Notify change of address',
        titleFr: "Notifier un changement d'adresse",
        tier: 'pro',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'old_address', label: 'Old address', placeholder: 'Previous full address' },
          { key: 'new_address', label: 'New address', placeholder: 'New full address' },
          { key: 'move_date', label: 'Move-in date', placeholder: 'e.g. 1 April 2026' },
          { key: 'register_number', label: 'National register number (if known)', placeholder: 'Optional' },
        ],
        body: `Dear Administration,

I am writing to notify you of my change of address.

Name: {your_name}
Previous address: {old_address}
New address: {new_address}
Date of move: {move_date}
National register number: {register_number}

I request that my registration be updated accordingly. I understand that a police verification visit will be arranged at my new address.

Kind regards,
{your_name}`,
        bodyFr: `Madame, Monsieur,

Je vous informe de mon changement d'adresse.

Nom : {your_name}
Ancienne adresse : {old_address}
Nouvelle adresse : {new_address}
Date de déménagement : {move_date}
Numéro de registre national : {register_number}

Je vous demande de bien vouloir mettre à jour mon inscription en conséquence. Je suis conscient(e) qu'une visite de vérification de la police sera organisée à ma nouvelle adresse.

Cordialement,
{your_name}`,
      },
    ],
  },
  {
    id: 'energy',
    label: 'Energy provider',
    labelFr: "Fournisseur d'énergie",
    topics: [
      {
        id: 'energy-register',
        title: 'Register as a new customer',
        titleFr: "M'inscrire comme nouveau client",
        tier: 'pro',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'provider_name', label: 'Provider name', placeholder: 'e.g. Sibelga / Luminus / Engie' },
          { key: 'address', label: 'Property address', placeholder: 'Full address including postcode' },
          { key: 'move_date', label: 'Move-in date', placeholder: 'e.g. 1 April 2026' },
          { key: 'meter_reading', label: 'Meter reading at move-in', placeholder: 'e.g. 4521 kWh' },
          { key: 'your_email', label: 'Your email', placeholder: 'your@email.com' },
        ],
        body: `Dear {provider_name},

I am writing to register as a new customer at {address}, where I moved in on {move_date}.

My details:
Name: {your_name}
Address: {address}
Move-in date: {move_date}
Meter reading at move-in: {meter_reading}
Email: {your_email}

Please initiate the necessary contracts and confirm the next steps by email.

Kind regards,
{your_name}`,
        bodyFr: `Madame, Monsieur,

Je souhaite m'inscrire en tant que nouveau client pour le bien situé au {address}, où j'ai emménagé le {move_date}.

Mes coordonnées :
Nom : {your_name}
Adresse : {address}
Date d'emménagement : {move_date}
Relevé du compteur à l'emménagement : {meter_reading}
E-mail : {your_email}

Merci de bien vouloir initier les contrats nécessaires et de me confirmer les prochaines étapes par e-mail.

Cordialement,
{your_name}`,
      },
    ],
  },
  {
    id: 'bank',
    label: 'Bank',
    labelFr: 'Banque',
    topics: [
      {
        id: 'bank-open-account',
        title: 'Request to open an account',
        titleFr: 'Demander l\'ouverture d\'un compte',
        tier: 'pro',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'bank_name', label: 'Bank name', placeholder: 'e.g. BNP Paribas Fortis / KBC' },
          { key: 'address', label: 'Your address in Belgium', placeholder: 'Full Belgian address' },
          { key: 'employer', label: 'Employer name', placeholder: 'Your employer in Belgium' },
          { key: 'your_email', label: 'Your email', placeholder: 'your@email.com' },
          { key: 'your_phone', label: 'Your phone', placeholder: '+32 ...' },
        ],
        body: `Dear {bank_name},

I am writing to request an appointment to open a Belgian bank account.

My details:
Name: {your_name}
Belgian address: {address}
Employer: {employer}
Email: {your_email}
Phone: {your_phone}

I will bring my passport, commune registration document (Annex 8 or eID), employment contract, and proof of address to the appointment.

Kind regards,
{your_name}`,
        bodyFr: `Madame, Monsieur,

Je souhaite prendre rendez-vous afin d'ouvrir un compte bancaire belge.

Mes coordonnées :
Nom : {your_name}
Adresse belge : {address}
Employeur : {employer}
E-mail : {your_email}
Téléphone : {your_phone}

Je me présenterai avec mon passeport, mon document d'inscription communale (Annexe 8 ou carte d'identité électronique), mon contrat de travail et un justificatif de domicile.

Cordialement,
{your_name}`,
      },
    ],
  },
  {
    id: 'doctor',
    label: 'Doctor',
    labelFr: 'Médecin',
    topics: [
      {
        id: 'doctor-register',
        title: 'Register with a GP',
        titleFr: "M'inscrire chez un médecin généraliste",
        tier: 'free',
        fields: [
          { key: 'your_name', label: 'Your name', placeholder: 'Your full name' },
          { key: 'doctor_name', label: "Doctor's name", placeholder: "Dr. ..." },
          { key: 'practice_name', label: 'Practice name', placeholder: 'Optional' },
          { key: 'dob', label: 'Date of birth', placeholder: 'e.g. 15 June 1990' },
          { key: 'address', label: 'Your address', placeholder: 'Full address' },
          { key: 'mutuelle', label: 'Your mutuelle', placeholder: 'e.g. Solidaris / Mutualité Chrétienne' },
          { key: 'your_phone', label: 'Your phone', placeholder: '+32 ...' },
        ],
        body: `Dear {doctor_name},

I am writing to request registration as a new patient at your practice.

My details:
Name: {your_name}
Date of birth: {dob}
Address: {address}
Mutuelle: {mutuelle}
Phone: {your_phone}

I am a new resident in Brussels and am looking for a médecin traitant for ongoing care. I prefer consultations in English if possible.

Please let me know if you have availability and what steps I need to follow to complete my registration.

Kind regards,
{your_name}`,
        bodyFr: `Docteur {doctor_name},

Je vous contacte afin de m'inscrire comme nouveau patient dans votre cabinet.

Mes coordonnées :
Nom : {your_name}
Date de naissance : {dob}
Adresse : {address}
Mutuelle : {mutuelle}
Téléphone : {your_phone}

Je suis un(e) nouveau/nouvelle résident(e) à Bruxelles et je cherche un médecin traitant pour un suivi régulier. Je préfère les consultations en anglais si possible.

Merci de me faire savoir si vous avez des disponibilités et quelles démarches je dois effectuer pour finaliser mon inscription.

Cordialement,
{your_name}`,
      },
    ],
  },
]
