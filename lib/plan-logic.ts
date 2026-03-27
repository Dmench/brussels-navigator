import { COMMUNES, MONTHLY_COSTS } from './constants'
import type { PlanAnswers, BudgetLevel } from './types'

type Commune = typeof COMMUNES[number]

export function getRecommendedCommunes(answers: PlanAnswers, count = 3): Commune[] {
  const scored = COMMUNES.map(commune => {
    let score = 0

    // Budget
    if (answers.budget === 'budget' && commune.rent <= 900) score += 3
    else if (answers.budget === 'moderate' && commune.rent >= 850 && commune.rent <= 1100) score += 3
    else if (answers.budget === 'comfortable' && commune.rent >= 1000) score += 2

    // Vibe
    if (answers.vibe === 'urban' && commune.walk >= 4 && commune.transit >= 4) score += 3
    if (answers.vibe === 'residential' && commune.green >= 4) score += 3
    if (answers.vibe === 'eclectic' && commune.expat >= 3 && commune.rent <= 1000) score += 3

    // Commute to EU quarter
    if (answers.commute === 'essential') {
      if (['etterbeek', 'ixelles', 'woluwe-sl', 'bruxelles'].includes(commune.id)) score += 3
    }
    if (answers.commute === 'useful') {
      if (commune.transit >= 4) score += 1
    }

    // Profile
    if (answers.profile === 'eu' && ['etterbeek', 'ixelles', 'woluwe-sl'].includes(commune.id)) score += 2
    if (answers.profile === 'student' && ['ixelles', 'saint-gilles', 'schaerbeek'].includes(commune.id)) score += 2
    if (answers.profile === 'non-eu' && ['ixelles', 'etterbeek', 'bruxelles'].includes(commune.id)) score += 1

    return { commune, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(s => s.commune)
}

export function getTotalMonthlyCost(budget: BudgetLevel): number {
  return MONTHLY_COSTS.reduce((sum, item) => sum + item[budget], 0)
}

export function getCostBreakdown(budget: BudgetLevel) {
  const total = getTotalMonthlyCost(budget)
  return MONTHLY_COSTS.map(item => ({
    label: item.label,
    amount: item[budget],
    percent: Math.round((item[budget] / total) * 100),
  }))
}
