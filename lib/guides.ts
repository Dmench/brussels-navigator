export const GUIDES = [
  {
    slug: 'commune-registration',
    title: 'How to register at your commune',
    category: 'Administration',
    readTime: '10 min',
    excerpt: 'A step-by-step walkthrough of commune registration in Brussels, including which documents you need and what to expect.',
    content: `
## What is commune registration?

Every person living in Belgium must register at the commune (municipality) where they reside. Brussels has 19 communes, and you register at whichever one your address falls in.

## When to go

You should register within 8 working days of moving into your new address. In practice, most communes are flexible about this timeline, but do not wait more than a few weeks.

## Documents you need

Bring all of the following to your appointment: your valid passport or national ID card; a copy of your rental contract or proof of address; passport-sized photographs (bring at least four, as different forms may require them); your employment contract or proof of enrollment if you are a student; a birth certificate with apostille for non-EU citizens; and your marriage certificate if applicable.

## What happens at the appointment

You will fill out a registration form and submit your documents. The commune will then send a local police officer (agent de quartier) to your address within approximately two weeks to verify that you actually live there. You need to be home during this period — they do not always call ahead.

## After verification

Once the police officer confirms your address, the commune will contact you to collect your Belgian residence card (carte de séjour) or eID. This typically takes 2–4 weeks after the verification visit.

## Practical tips

Book your appointment online if the commune offers it — walk-in waits can exceed an hour at Ixelles and Saint-Gilles. Bring extra passport photos. Some communes accept card payments, but bring cash as a backup. Speak French or Dutch if possible, even at a basic level — it is appreciated.
    `.trim(),
  },
  {
    slug: 'finding-housing',
    title: 'How to find an apartment in Brussels',
    category: 'Housing',
    readTime: '12 min',
    excerpt: 'Where to search, what to expect on costs, and how to avoid common mistakes when renting in Brussels.',
    content: `
## Where to search

Immoweb is Belgium's largest property platform and where most listings appear first. Zimmo aggregates from multiple sources and sometimes catches listings that Immoweb misses. For furnished and short-term rentals, Spotahome and HousingAnywhere are popular with expats who want to book before arriving.

Facebook housing groups (particularly "Brussels Housing / Appartements") list direct-from-owner properties that avoid agency fees. These move fast — check multiple times per day.

## Costs to expect

Rent for a one-bedroom apartment ranges from approximately 750 euros in outer communes to 1,300 euros in central areas like Ixelles or Uccle. On top of rent, expect 100–200 euros per month for utilities (gas, electricity, water) and 50–80 euros for internet.

Your landlord will ask for a rental guarantee (garantie locative) of two to three months' rent, deposited in a blocked bank account. If you use a real estate agent, expect one month's rent as their fee.

## What to check when viewing

Visit apartments in person if at all possible. Check water pressure, heating controls, and natural light at different times of day. Ask about the charges communes (building maintenance fees) — these are on top of rent and can add 50–150 euros per month. Look at the état des lieux (condition report) carefully before signing — this document protects both you and the landlord.

## Understanding the lease

Standard Belgian leases are for nine years with the possibility of early termination with notice (typically three months for each completed three-year period). Short-term leases of one to three years are common and have different termination rules. Read the lease carefully — it will be in French or Dutch. If you do not understand it, pay for a legal translation before signing.
    `.trim(),
  },
  {
    slug: 'belgian-taxes',
    title: 'Understanding Belgian taxes as an expat',
    category: 'Finance',
    readTime: '15 min',
    excerpt: 'An overview of the Belgian tax system, filing deadlines, and what to know in your first year.',
    content: `
## Important disclaimer

This guide provides general information only. Belgian tax law is complex, and your situation may involve special regimes (like the expat tax regime), bilateral treaties, or other factors specific to your circumstances. Consult a qualified tax advisor for personal advice before filing.

## The basics

Belgium taxes residents on worldwide income. The tax year is the calendar year (January to December). You file your return the following year, typically between May and June, via Tax-on-Web (MyMinfin) — the official online filing system. The exact deadlines vary each year; check the FPS Finance website for current dates.

## Belgian income tax rates

Income tax is progressive, ranging from 25 to 50 percent depending on your income bracket. Municipal taxes add an additional surcharge that varies by commune — typically between 6 and 9 percent on top of the federal rate. Social security contributions are generally handled by your employer and are not part of the personal tax return.

## The expat tax regime

Belgium offers a special tax regime for qualifying expatriates and foreign executives. Under this regime, certain allowances and benefits can be exempt from Belgian tax. Eligibility depends on your role, salary level, and whether you were recruited from abroad. This regime changed significantly in 2024 — consult a tax advisor for the current rules before making assumptions.

## Key resources

Tax-on-Web (MyMinfin) is the official online filing platform at myminfin.be. The FPS Finance website (finances.belgium.be) publishes current rates, deadlines, and guides in French, Dutch, and English. For your first year, many expats hire an accountant who specialises in expat taxation — the cost (typically 200–500 euros) is often worth avoiding costly mistakes.
    `.trim(),
  },
  {
    slug: 'work-permits',
    title: 'Work permits and residency in Belgium',
    category: 'Immigration',
    readTime: '12 min',
    excerpt: 'EU and non-EU pathways to working and living legally in Belgium.',
    content: `
## EU citizens

If you hold citizenship of an EU or EEA member state, or Switzerland, you have the right to live and work in Belgium without a work permit. You simply need to register at your commune within eight working days of arrival. The commune will issue an Annex 8 document confirming your registration, and you will receive a residence card (carte de séjour) once the process is complete.

## Non-EU citizens

Most non-EU citizens need a Single Permit (permis unique), which is a combined work and residence permit. Importantly, your employer applies for this on your behalf — you cannot apply yourself. The process typically takes three to four months. Before the Single Permit arrives, you will receive an Annex 46 document that allows you to begin working and to present yourself at the commune for initial registration.

## Documents typically required

For the Single Permit application, your employer will need: a certified copy of your diploma, a criminal background check from your home country (apostilled), your passport, passport-size photos, and proof of accommodation. Requirements vary by nationality — your HR department or an immigration lawyer should manage this process.

## The Belgian expat tax regime

Belgium offers a special tax regime for qualifying expatriates. Eligibility depends on your role, salary level, and whether you were recruited from abroad. This regime changed significantly in 2024 and the rules are strict — confirm eligibility with a qualified tax advisor before assuming you qualify.

## Where to get help

The Immigration Office (Dienst Vreemdelingenzaken / Office des Étrangers) manages residence permits: dofi.ibz.be. The Federal Public Service Employment handles work permits: employment.belgium.be. Your employer's HR or legal department, or a Brussels-based immigration lawyer, is your most reliable first contact.
    `.trim(),
  },
] as const
