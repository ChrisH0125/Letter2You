import { useState, useRef, useEffect, use } from 'react'
import littleGuy from './assets/littleGuy.png'
import micIcon from './assets/microphone.png'
import sparkleImg from './assets/sparkle-stars-white-png.webp'
import PolaroidPreview from './components/PolaroidPreview'
import LetterForm from './features/letters/LetterForm'
// removed unused icons
import AboutPage from './features/about/AboutPage'
import Footer from './components/Footer'
import SignUp from './features/auth/SignUp'
import Navbar from './components/Navbar'
import HelpPopup from './components/HelpPopup'
// firebase 
import { auth } from "./firebaseClient";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

signOut(auth).catch((err) => console.error("Error signing out on startup:", err));

import './App.css'

function App() {
  const [view, setView] = useState<'home' | 'about' | 'signup'>('home')
  const [helpOpen, setHelpOpen] = useState(false)
  const letterRef = useRef<any | null>(null)
  const [showAssistant, setShowAssistant] = useState(false)

  const [user, setUser] = useState<User | null>(null)

  // Delay dropdown state
  const [showDelayDropdown, setShowDelayDropdown] = useState(false)
  const [selectedDelay, setSelectedDelay] = useState({ label: 'Send now', value: 0 })

  const delayOptions = [
    { label: 'Send now', value: 0 },
    { label: '1 minute', value: 1 * 60 * 1000 },
    { label: '1 month', value: 30 * 24 * 60 * 60 * 1000 },
    { label: '1 year', value: 365 * 24 * 60 * 60 * 1000 },
    { label: '3 years', value: 3 * 365 * 24 * 60 * 60 * 1000 },
    { label: '5 years', value: 5 * 365 * 24 * 60 * 60 * 1000 }
  ]

  const selectDelay = (option: { label: string, value: number }) => {
    setSelectedDelay(option)
    setShowDelayDropdown(false)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])
 
  if (view === 'about') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar view={view} setView={setView} user={user} onLogout={() => {
          signOut(auth);
          setView("home");
        }}/>
        <div className="pt-16 flex-1 flex w-full">{/* pt-16 to offset fixed navbar height */}
          <AboutPage onNavigateHome={() => setView('home')} />
        </div>
  <Footer onNavigateAbout={() => setView('about')} />
      </div>
    )
  }

  if (view === 'signup') {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="p-4 flex justify-start">
          <button
            className="px-3 py-2 rounded bg-gray-200"
            onClick={() => setView('home')}
          >
            ◀ Back
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <SignUp />
        </div>
        <Footer onNavigateAbout={() => setView('about')} />
      </div>
    )
  }


  return (
    <div className="min-h-screen flex flex-col">
        <Navbar view={view} setView={setView} user={user} onLogout={() => {
          signOut(auth);
          setView("home");
        }}/>      

      <div className="pt-16" /> {/* spacing to account for fixed navbar */}

      <main className="flex-1 flex items-center justify-center mb-8">
        <div className="page">
          <div className="logoLetterWrap flex flex-col items-start">
            <div className="hero-panel">
              <div className="hero-pill" />

              <div className="left-controls">
                <button className="control-btn" title="AI-Assistant" aria-label="AI-Assistant" onClick={() => setShowAssistant(true)}>
                  <img src={sparkleImg} alt="sparkle" />
                </button>
                <button className="control-btn" title="Voice" aria-label="Voice" onClick={() => (letterRef.current as any)?.toggleMic()}>
                  <img src={micIcon} alt="mic" />
                </button>
              </div>

              <div className="letter-polaroid-container flex flex-row items-start gap-24">
                <div className="letter-section relative">
                  <LetterForm ref={letterRef} />
                  <div className="watermark">
                    <img src={littleGuy} alt="watermark logo" className="watermark-img" />
                  </div>
                </div>

                <div className="polaroid-section flex justify-center flex-col items-center gap-9">
                  <PolaroidPreview />
                  <input type="email" className="email-input w-full text-[#8b2b2b] text-center bg-[#ffffff] rounded-[6px]" placeholder="Enter email to send to" />
                </div>
              </div>

              <div className="send-row" style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
                <div className="relative">
                  {/* LETTER SEND DROPDOWN */}
                  <button 
                    onClick={() => setShowDelayDropdown(!showDelayDropdown)}
                    className="px-4 py-2 bg-[#F6D6DA] text-white rounded-lg border border-[#8F002D] flex items-center gap-2"
                  >
                    {selectedDelay.label} 
                    <span className={`transform transition-transform duration-200 ${showDelayDropdown ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {showDelayDropdown && (
                    <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[140px] z-50">
                      {delayOptions.map((option) => (
                        <div 
                          key={option.value}
                          onClick={() => selectDelay(option)}
                          className="px-4 py-2 hover:bg-[#F8DBDF] cursor-pointer text-[#8F002D] first:rounded-t-lg last:rounded-b-lg"
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="send-btn" onClick={() => (document.getElementById('letter-form') as HTMLFormElement | null)?.requestSubmit()}>Send</button>
              </div>

              {/* helper trigger rendered inside the panel at bottom-right */}
              <div className="help-wrapper">
                <div className="help-bubble">Click me for help!</div>
                <div className="help-button" onClick={() => setHelpOpen(true)} style={{ cursor: 'pointer' }}>
                  <img src={littleGuy} alt="help" style={{ width: 72, height: 72 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      

      <HelpPopup open={helpOpen} onClose={() => setHelpOpen(false)} />

      <Footer onNavigateAbout={() => setView('about')} />
    </div>
  )
}

export default App
