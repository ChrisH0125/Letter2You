export default function AboutPage() {
  const team = [
    { name: 'Chris Ho', role: 'API Integration and Frontend', bio: 'Implemented API to create meaningful features' },
    { name: 'Anakin Maksylewicz', role: 'Frontend', bio: 'Designed the letter creation page and created animations' },
    { name: 'Reese Odvina', role: 'Design UI/UX', bio: "Created assests and designed the website using figma and moodboards"},
    { name: 'Kevin Trinh', role: 'Backend', bio: 'Set up the OAuth backend utilizing the firebase service' },
  ]

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">About Letter2You</h1>
        <p className="mt-3 text-gray-600">We make it easy to send meaningful, handwritten-style letters to the people who matter.</p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 items-center mb-10">
        <div>
          <h2 className="text-xl font-semibold">Our mission</h2>
          <p className="mt-2 text-gray-600">To reconnect people through thoughtful, tangible messages. We combine simple tools with beautiful designs so anyone can send a letter that feels personal.</p>

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

        <div className="bg-gray-50 border rounded-lg p-5">
          <h3 className="font-semibold">Why Letter2You?</h3>
          <p className="mt-2 text-gray-600">Because small gestures matter. A handwritten-style note can brighten someone's day — we help you do that without friction and have a customizable photo in your message.</p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Try it out!</button>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Meet the team</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {team.map((m) => (
            <div key={m.name} className="border rounded-lg p-4 bg-white">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">{m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <h3 className="mt-3 font-medium">{m.name}</h3>
              <p className="text-sm text-gray-500">{m.role}</p>
              <p className="mt-2 text-gray-600 text-sm">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6">© {new Date().getFullYear()} Letter2You — Made with care.</footer>
    </main>
  )
}
