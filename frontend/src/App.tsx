import { useState } from 'react'
import littleGuy from './assets/littleGuy.png'
import PolaroidPreview from './components/PolaroidPreview'
import LetterForm from './features/letters/LetterForm'
import cameraIcon from './assets/cameraIcon.png'
import AboutPage from './features/about/AboutPage'
import Footer from './components/Footer'

import './App.css'

function App() {
  const [view, setView] = useState<'home' | 'about'>('home')

  if (view === 'about') {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="p-4 flex justify-end">
          <button className="px-3 py-2 rounded bg-gray-200" onClick={() => setView('home')}>◀ Back</button>
        </div>
        <div className="flex-1 flex w-full">
          <AboutPage onNavigateHome={() => setView('home')} />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Quick About button for testing navigation */}
      <div className="p-4 flex justify-end">
        <button className="px-3 py-2 rounded bg-pink-500 text-white" onClick={() => setView('about')}>About</button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="page">
          <div className="logoLetterWrap flex flex-col items-start">
            <div className="logo flex flex-col items-start">
              <img src={littleGuy} alt="logo" style={{ width: '8vw', height: 'auto', minWidth: '80px', maxWidth: '150px' }} /> {/*Placeholder logo (unless we want to keep him)*/}
              <h1 className="text-left font-bold text-[#8F002D]" style={{ fontSize: '2.5vw' }}>Letter2You</h1>
            </div>

            {/* Container for letter and polaroid side by side */}
            <div className="letter-polaroid-container flex flex-row items-center gap-24">
              {/* Letter box with watermark */}
              <div className="letter-section relative">
                <LetterForm/>
                <div className="watermark">
                  <img src={littleGuy} alt="watermark logo" className="watermark-img" />
                </div>
              </div>
              
              {/* Polaroid section - separate from letter */}
              <div className="polaroid-section">
                <PolaroidPreview/>
              </div>
            </div>
          </div>

          <div className="buttonWrap">
            {/* Figure out a way to send letter to backend, probably something like
            adding an onClick attribute to this button and then creating a function
            that sends letter to backend */}

            {/* Make camera button take picture of you and store that image somewhere, pass to PolaroidPreview function */}
            <button className="cameraButton"> <img src={cameraIcon}></img> </button>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
