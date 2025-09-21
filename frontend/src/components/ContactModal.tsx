import { useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  recipient?: string
}

export default function ContactModal({ open, onClose, recipient }: Props) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div role="dialog" aria-modal="true" className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 mx-4 ring-1 ring-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Contact {recipient ?? 'the team'}</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose() }}>
          <label className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
          <input draggable={false} type="email" required className="w-full px-3 py-2 rounded-lg border border-gray-300 mb-4 bg-gray-50 text-gray-900 placeholder-gray-400" placeholder="you@example.com" />

          <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
          <textarea draggable={false} required className="w-full px-3 py-2 rounded-lg border border-gray-300 mb-4 bg-gray-50 text-gray-900 placeholder-gray-400 resize-none" rows={5} placeholder="Say hi..." />

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-pink-500 text-white">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}
