import { notFound } from 'next/navigation'
import { ANSWERS } from '@/lib/answers'
import { AnswerClient } from './AnswerClient'

export async function generateStaticParams() {
  return ANSWERS.map(a => ({ slug: a.slug }))
}

export default async function AnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const answer = ANSWERS.find(a => a.slug === slug)
  if (!answer) notFound()

  const relatedAnswers = ANSWERS.filter(a => a.category === answer.category && a.slug !== answer.slug).slice(0, 3)

  return <AnswerClient answer={answer} relatedAnswers={relatedAnswers} />
}
