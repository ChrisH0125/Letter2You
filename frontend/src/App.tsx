import { useState } from 'react'
import littleGuy from './assets/littleGuy.png'
import PolaroidPreview from './components/PolaroidPreview'
import LetterForm from './features/letters/LetterForm'
import cameraIcon from './assets/cameraIcon.png'
import AboutPage from './features/about/AboutPage'
import './App.css'

function App() {
  const [view, setView] = useState<'home' | 'about'>('home')

  if (view === 'about') {
    return (
      <div>
        <div className="p-4">
          <button className="px-3 py-2 rounded bg-gray-200" onClick={() => setView('home')}>◀ Back</button>
        </div>
        <AboutPage />
      </div>
    )
  }

  return (
    <>
      {/* Quick About button for testing navigation */}
      <div className="p-4 flex justify-end">
        <button className="px-3 py-2 rounded bg-pink-500 text-white" onClick={() => setView('about')}>About</button>
      </div>

      {/* LINKS TO DIFFERENT PAGES WOULD GO IN A DIV IN HERE (for top option) */}
      <div className = "page">

        <div className = "logoLetterWrap">
          <div className = "logo">
            <img src = {littleGuy} alt = "logo" /> {/*Placeholder logo (unless we want to keep him)*/}
            <h1 className = "text-center font-bold text-[#8F002D]">Letter2You</h1>
          </div>


            <div className = "letterWrap">

              <LetterForm/>
              <div className="watermark">
                <img src={littleGuy} alt="watermark logo" className="watermark-img" />
              </div>

              <div className = "polaroid">
                {/* Pass photo from camera button into this function */}
                <PolaroidPreview/>
              </div>

            </div>

        </div>

           <div className = "buttonWrap">
                {/* Figure out a way to send letter to backend, probably something like
                adding an onClick attribute to this button and then creating a function
                that sends letter to backend */}
                <button> Send Letter </button>
                {/* Make camera button take picture of you and store that image somewhere, pass to PolaroidPreview function */}
                <button className = "cameraButton"> <img src = {cameraIcon}></img> </button>

              </div>

      </div>

      {/* LINKS TO DIFFERENT PAGES WOULD GO IN A DIV IN HERE (for bottom option) */}

    </>
  )
}

export default App
