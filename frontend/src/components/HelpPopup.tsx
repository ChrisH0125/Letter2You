type HelpPopupProps = {
  open: boolean
  onClose: () => void
}

export default function HelpPopup({ open, onClose }: HelpPopupProps) {
  return (
    <div className={`help-popup ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
      <div className="help-card">
        <div className="help-header">
          <h3 className="help-title">Need a hand?</h3>
          <button className="help-close" onClick={onClose} aria-label="Close help">✕</button>
        </div>

        <div className="help-body">
          <p className="help-intro">Hi! I'm Lenny the Letter — click the sparkle for AI help, or tap the microphone to speak your message.</p>
          <ol className="help-list">
            <li>Type your letter in the white box.</li>
            <li>Click the grey polaroid to take or add a photo.</li>
            <li>Press Send when you're ready.</li>
          </ol>
        </div>

        <div className="help-footer">
          <button className="help-done" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  )
}
