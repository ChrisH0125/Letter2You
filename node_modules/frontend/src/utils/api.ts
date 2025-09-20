export async function fetchLetters() {
  const res = await fetch('/api/letters')
  return res.json()
}
