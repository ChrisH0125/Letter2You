import LetterCard from '../../components/LetterCard'

const sample = [
  { title: 'Hello', body: 'First letter' },
]

export default function LetterList() {
  return (
    <div className="grid gap-3">
      {sample.map((l, i) => (
        <LetterCard key={i} title={l.title} body={l.body} />
      ))}
    </div>
  )
}
