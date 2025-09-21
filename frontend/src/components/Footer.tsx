export default function Footer() {
	return (
		<footer className="bg-[#2b2436] text-gray-200">
			<div className="max-w-screen-xl mx-auto px-6 py-10">
				<div className="border-t border-gray-600/40 -mt-6" />
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start py-8">
					<div className="flex flex-col items-start">
						<div className="flex items-center gap-3 mb-3">
							<img src="/src/assets/Logo.png" alt="logo" className="h-10 w-10 rounded" />
							<span className="font-semibold text-lg text-green-300">Letter2You</span>
						</div>
						<p className="text-sm text-gray-300 max-w-xs"></p>
					</div>

					<div>
						<h4 className="text-sm font-semibold mb-3 text-gray-200 uppercase">About</h4>
						<ul className="space-y-2 text-sm text-gray-300">
							<li><a className="hover:underline">about</a></li>
							<li><a className="hover:underline">contact us</a></li>
						</ul>
					</div>

					<div>
						<h4 className="text-sm font-semibold mb-3 text-gray-200 uppercase">Legal</h4>
						<ul className="space-y-2 text-sm text-gray-300">
							<li><a className="hover:underline">terms of service</a></li>
							<li><a className="hover:underline">privacy</a></li>
						</ul>
					</div>

					<div>
						<h4 className="text-sm font-semibold mb-3 text-gray-200 uppercase">Social</h4>
						<div className="flex items-center gap-4 text-gray-300">
							<a aria-label="linkedin" className="hover:text-white">in</a>
							<a aria-label="twitter" className="hover:text-white">tw</a>
							<a aria-label="instagram" className="hover:text-white">ig</a>
							<a aria-label="github" className="hover:text-white">gh</a>
						</div>
					</div>
				</div>

				<div className="pt-6 border-t border-gray-700/40 text-xs text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
					<div>© {new Date().getFullYear()} Letter2You — Made with care.</div>
					<div className="flex items-center gap-4">
						<div className="text-gray-400">resources</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

