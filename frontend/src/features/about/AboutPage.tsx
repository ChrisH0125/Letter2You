export default function AboutPage() {
  const team = [
      { name: 'Chris Ho', role: 'API Integration and Frontend', bio: 'Implemented API to create meaningful features', avatar: 'src/assets/Chris.jpg' },
      { name: 'Anakin Maksylewicz', role: 'Frontend', bio: 'Designed the letter creation page and created animations', avatar: 'src/assets/Anakin.jpg' },
      { name: 'Reese Odvina', role: 'Design UI/UX', bio: "Created assets and designed the website", avatar: 'src/assets/Reese.jpg' },
      { name: 'Kevin Trinh', role: 'Backend', bio: 'Set up the OAuth backend utilizing the firebase service', avatar: 'src/assets/kevin.jpg' },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <div className="max-w-screen-xl mx-auto px-10 py-10 flex-1 pt-28" style={{ minHeight: 'calc(100vh - 120px)' }}>

        <header className="fixed top-6 left-6 z-50 flex items-center gap-4 bg-transparent">
          <img src="/src/assets/Logo.png" alt="logo" className="h-16 w-16 rounded p-2" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#7b1233]">Letter2You</h1>
        </header>

        <section className="text-center mb-10">
          <h2 className="text-5xl md:text-6xl font-extrabold">About Letter2You</h2>
          <p className="mt-4 text-lg md:text-xl text-[#3b2a2a] max-w-3xl mx-auto">We make it easy to send meaningful, handwritten-style letters to the people who matter.</p>
        </section>

        <section className="grid md:grid-cols-2 gap-6 items-center mb-10">
          <div>
            <h2 className="text-xl font-semibold">Our mission</h2>
            <p className="mt-2 text-[#3b2a2a]">To reconnect people through thoughtful, tangible messages. We combine simple tools with beautiful designs so anyone can send a letter that feels personal.</p>

            <ul className="mt-4 space-y-2">
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

          <div className="bg-white border rounded-lg p-5">
            <h3 className="font-semibold">Why Letter2You?</h3>
            <p className="mt-2 text-[#3b2a2a]">Because small gestures matter. A handwritten-style note can brighten someone's day — we help you do that without friction and have a customizable photo in your message.</p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Try it out!</button>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12">Meet the team</h2>
          <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {team.map((m) => (
              <div key={m.name} className="relative w-full flex">
                <div className="flex-1 max-w-xl w-full mx-auto border rounded-3xl p-12 bg-gradient-to-b from-white to-pink-50 shadow-2xl text-center overflow-visible flex flex-col items-center" style={{ minHeight: 360 }}>
                  <div className="-mt-24 mb-6 flex justify-center">
                    <img src={m.avatar} alt={m.name} className="h-48 w-48 rounded-full border-4 border-white shadow-lg object-cover" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold mt-2 text-[#3b2a2a]">{m.name}</h3>
                  <div className="text-base text-[#3b2a2a]">{m.role}</div>
                  <p className="mt-4 text-base text-[#3b2a2a] flex-1">{m.bio}</p>
                  <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full text-sm md:text-base">Contact Me</button>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
      <footer className="h-24 flex items-center justify-center text-sm text-[#3b2a2a]">© {new Date().getFullYear()} Letter2You — Made with care.</footer>
    </main>
  )
}
