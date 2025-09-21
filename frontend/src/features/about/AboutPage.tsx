import Footer from '../../components/Footer'
import { useState } from 'react'
import ContactModal from '../../components/ContactModal'

type AboutPageProps = {
  onNavigateHome?: () => void
}

export default function AboutPage({ onNavigateHome }: AboutPageProps) {
  const [contactOpen, setContactOpen] = useState(false)
  const [contactRecipient, setContactRecipient] = useState<string | undefined>(undefined)
  const team = [
      { name: 'Chris Ho', role: 'API Integration and Frontend', bio: 'Implemented API to create meaningful features', avatar: 'src/assets/Chris.jpg' },
      { name: 'Anakin Maksylewicz', role: 'Frontend', bio: 'Designed the letter page and created animations', avatar: 'src/assets/Anakin.jpg' },
      { name: 'Reese Odvina', role: 'Design UI/UX', bio: "Created assets and designed the website", avatar: 'src/assets/Reese.jpg' },
      { name: 'Kevin Trinh', role: 'Backend', bio: 'Set up the OAuth backend utilizing the firebase service', avatar: 'src/assets/kevin.jpg' },
  ]
  return (
    <main className="w-full bg-[#E7C9A9]">
      <div className="py-10 px-6 bg-[#E7C9A9]">

        <section className="text-center mb-10">
          <h2 className="text-5xl md:text-6xl font-extrabold font-bold text-lg text-red-400">About Letter2You</h2>
          <p className="mt-4 text-lg md:text-xl text-[#3b2a2a] max-w-3xl mx-auto">We make it easy to send meaningful, handwritten-style letters to the people who matter.</p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-start mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
            <h2 className="text-2xl font-bold text-red-400 mb-3">Our mission</h2>
            <p className="mt-2 text-[#3b2a2a]">To reconnect people through thoughtful, tangible messages. We combine simple tools with beautiful designs so anyone can send a letter that feels personal.</p>

            <ul className="mt-6 space-y-3 text-[#3b2a2a]">
              <li className="flex items-start">
                <span className="inline-block mr-3 text-green-600">✓</span>
                <span>Fast, friendly flows for creating letters.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-3 text-green-600">✓</span>
                <span>Privacy-first handling of your messages.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block mr-3 text-green-600">✓</span>
                <span>Beautiful printed output when you need it.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/75 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-white/20 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-red-400 mb-3 text-xl">Why Letter2You?</h3>
              <p className="mt-2 text-[#3b2a2a]">Because small gestures matter. A handwritten-style note can brighten someone's day — we help you do that without friction and have a customizable photo in your message. Simply type in whatever message you want to convey, have the option to take a picture/polaroid, and customize it to your desire! </p>
            </div>
            <div className="mt-6 flex justify-start">
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600"
                onClick={() => {
                  if (onNavigateHome) onNavigateHome()
                  else window.location.href = '/'
                }}
              >
                Try it out!
              </button>
            </div>
          </div>
        </section>

  <section className="mb-12 text-center pt-16">
          <h2 className="text-3xl md:text-7xl font-bold text-red-400 mb-8">Meet the team!</h2>
          <div className="mx-auto grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-16 max-w-6xl justify-center">
            {team.map((m) => (
              <div key={m.name} className="relative w-full flex">
                <div className="flex-1 max-w-xl w-full mx-auto border rounded-3xl p-12 bg-gradient-to-b from-white to-pink-50 shadow-2xl text-center overflow-visible flex flex-col items-center" style={{ minHeight: 420 }}>
                  <div className="-mt-24 mb-6 flex justify-center">
                    <img src={m.avatar} alt={m.name} className="h-48 w-48 rounded-full border-4 border-white shadow-lg object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <h3 className="text-2xl md:text-3xl font-semibold mt-2 text-[#3b2a2a]">{m.name}</h3>
                    <div className="text-base text-[#3b2a2a]">{m.role}</div>
                    <p className="mt-4 text-base text-[#3b2a2a] max-w-lg">{m.bio}</p>
                    <div className="mt-6">
                      <button
                        className="px-6 py-3 bg-blue-600 text-white rounded-full text-sm md:text-base"
                        onClick={() => { setContactRecipient(m.name); setContactOpen(true) }}
                      >
                        Contact Me
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} recipient={contactRecipient} />
    </main>
  )
}
