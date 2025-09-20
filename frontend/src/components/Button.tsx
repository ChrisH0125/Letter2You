export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-3 py-1 bg-blue-600 text-white rounded">{children}</button>
  )
}
