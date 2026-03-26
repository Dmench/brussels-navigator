import { COMMUNES, PROFILES } from './constants'
import type { PlanAnswers, BudgetLevel } from './types'

type Commune = typeof COMMUNES[number]

const BUDGET_RENT_LIMITS: Record<BudgetLevel, number> = {
  budget: 900,
  moderate: 1150,
  comfortable: Infinity,
}

const VIBE_WEIGHTS: Record<string, Partial<Record<keyof Commune, number>>> = {
  lively:  { walk: 2, expat: 1.5 },
  green:   { green: 2, safety: 1.5 },
  central: { walk: 1.5, transit: 2 },
  family:  { safety: 2, green: 1.5 },
}

const COMMUTE_PREFERRED: Record<string, string[]> = {
  'eu-quarter':  ['etterbeek', 'ixelles', 'woluwe-sl', 'auderghem'],
  'city-center': ['bruxelles', 'saint-gilles', 'ixelles'],
  'nato':        ['schaerbeek', 'woluwe-sl', 'etterbeek'],
  'remote':      ['ixelles', 'saint-gilles', 'schaerbeek'],
  'university':  ['ixelles', 'saint-gilles', 'forest'],
}

function scoreCommune(commune: Commune, answers: PlanAnswers): number {
  let score = 0

  // Base score from all ratings
  score += commune.expat + commune.transit + commune.green + commune.safety + commune.walk

  // Vibe weight
  if (answers.vibe && VIBE_WEIGHTS[answers.vibe]) {
    const weights = VIBE_WEIGHTS[answers.vibe]
    if (weights.walk) score += commune.walk * weights.walk
    if (weights.expat) score += commune.expat * weights.expat
    if (weights.green) score += commune.green * weights.green
    if (weights.safety) score += commune.safety * weights.safety
    if (weights.transit) score += commune.transit * weights.transit
  }

  // Commute bonus
  if (answers.commute) {
    const preferred = COMMUTE_PREFERRED[answers.commute] ?? []
    const rank = preferred.indexOf(commune.id)
    if (rank === 0) score += 10
    else if (rank === 1) score += 7
    else if (rank === 2) score += 4
    else if (rank === 3) score += 2
  }

  // Profile bonus
  if (answers.profile) {
    const profile = PROFILES[answers.profile]
    if (profile.top_communes.includes(commune.id as never)) score += 5
  }

  return score
}

export function getRecommendedCommunes(answers: PlanAnswers, count = 3) {
  const rentLimit = answers.budget ? BUDGET_RENT_LIMITS[answers.budget] : Infinity

  const filtered = (COMMUNES as readonly Commune[]).filter(c => c.rent <= rentLimit)
  const candidates = filtered.length >= count ? filtered : (COMMUNES as readonly Commune[])

  return [...candidates]
    .sort((a, b) => scoreCommune(b, answers) - scoreCommune(a, answers))
    .slice(0, count)
}

export function getTotalMonthlyCost(budget: BudgetLevel): number {
  const TOTALS: Record<BudgetLevel, number> = {
    budget: 1480,
    moderate: 2230,
    comfortable: 3340,
  }
  return TOTALS[budget]
}
