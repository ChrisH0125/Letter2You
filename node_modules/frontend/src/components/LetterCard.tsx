export default function LetterCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="border p-3 rounded shadow-sm">
      <h3 className="font-bold">{title}</h3>
      <p>{body}</p>
    </article>
  )
}
