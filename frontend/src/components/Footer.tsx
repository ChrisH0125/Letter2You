export default function Footer() {
	return (
		<footer className="bg-[#2b2436] text-gray-200 footer-root">
					<div className=" mx-auto px-6 py-10">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start py-8">
							<div className="flex flex-col items-start">
								<div className="flex items-center gap-3 mb-3">
													  <a href="/" aria-label="Go to home" className="group inline-flex items-center gap-3 footer-logo">
														<img src="/src/assets/Logo.png" alt="logo" className="h-10 w-10 rounded transition transform duration-200 group-hover:scale-105" />
														<span className="font-semibold text-lg text-red-400 transition transform duration-200 ease-out group-hover:scale-105 group-hover:tracking-wider" style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>Letter2You</span>
													</a>
              
								</div>
											<p className="text-sm text-gray-300 max-w-xs"></p>
							</div>

					<div>
						<h4 className="text-sm font-semibold mb-3 text-gray-200 uppercase">About</h4>
												<ul className="space-y-2 text-sm">
													<li><a href="#" className="text-red-400 hover:text-red-300 hover:underline">About</a></li>
													<li><a href="#" className="text-red-400 hover:text-red-300 hover:underline">Contact us</a></li>
												</ul>
					</div>

					<div>
						<h4 className="text-sm font-semibold mb-3 text-gray-200 uppercase">Legal</h4>
												<ul className="space-y-2 text-sm">
													<li><a href="#" className="text-red-400 hover:text-red-300 hover:underline">Terms of Service</a></li>
													<li><a href="#" className="text-red-400 hover:text-red-300 hover:underline">Privacy</a></li>
												</ul>
					</div>

					<div>
						<h4 className="text-sm font-semibold mb-3 text-gray-200 uppercase">Social</h4>
												<div className="flex items-center gap-4">
													<a href="#" aria-label="linkedin" className="text-red-400 hover:text-red-300" title="LinkedIn">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v14H0V8zm7.5 0H12v2h.1c.7-1.3 2.4-2.6 4.9-2.6 5.2 0 6.1 3.4 6.1 7.9V22h-5v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V22h-5V8z"/></svg>
										  </a>
										  <a href="#" aria-label="twitter" className="text-red-400 hover:text-red-300" title="Twitter">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.6c-.9.4-1.8.7-2.8.8 1-0.6 1.7-1.4 2-2.4-1 .6-2 .9-3.1 1.2C19 2 17.8 1.5 16.5 1.5c-2.3 0-4.1 2-4.1 4.4 0 .3 0 .6.1.9C8 6.6 4.3 4.9 1.7 2.1c-.3.5-.4 1.1-.4 1.7 0 1.5.8 2.8 1.9 3.6-.8 0-1.6-.3-2.3-.7v.1c0 2.1 1.5 3.9 3.5 4.3-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.7 3.7 2.7C6 18 3.4 19 0 19.6 2 20.8 4.4 21.5 7 21.5c8.4 0 13-7.3 13-13.6v-.6c.9-.7 1.6-1.5 2-2.5z"/></svg>
										  </a>
										  <a href="#" aria-label="instagram" className="text-red-400 hover:text-red-300" title="Instagram">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.3.1 2 .3 2.5.5.6.2 1 .5 1.4 1 .3.4.6.9.8 1.4.2.5.4 1.2.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.3-.3 2-.5 2.5-.2.6-.5 1-1 1.4-.4.3-.9.6-1.4.8-.5.2-1.2.4-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.3-.1-2-.3-2.5-.5-.6-.2-1-.5-1.4-1-.3-.4-.6-.9-.8-1.4-.2-.5-.4-1.2-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.3.3-2 .5-2.5.2-.6.5-1 1-1.4.4-.3.9-.6 1.4-.8.5-.2 1.2-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.7.1 4.9.3 4.2.5 3.3.8 2.6 1.3 2 1.9c-.6.6-1.1 1.3-1.4 2.2C.3 5 .1 5.8.1 7.1 0 8.4 0 8.7 0 12s0 3.6.1 4.9c.1 1.3.3 2 .5 2.7.3.9.8 1.6 1.4 2.2.6.6 1.3 1.1 2.2 1.4.7.2 1.4.4 2.7.5 1.3.1 1.7.1 4.9.1s3.6 0 4.9-.1c1.3-.1 2-.3 2.7-.5.9-.3 1.6-.8 2.2-1.4.6-.6 1.1-1.3 1.4-2.2.2-.7.4-1.4.5-2.7.1-1.3.1-1.7.1-4.9s0-3.6-.1-4.9c-.1-1.3-.3-2-.5-2.7-.3-.9-.8-1.6-1.4-2.2-.6-.6-1.3-1.1-2.2-1.4-.7-.2-1.4-.4-2.7-.5C15.6.1 15.2 0 12 0z"/></svg>
										  </a>
										  <a href="#" aria-label="github" className="text-red-400 hover:text-red-300" title="GitHub">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.7 2 1 .1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.4-5.5-6.3 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.7.1-3.4 0 0 1-.3 3.4 1.3.9-.3 1.9-.5 2.9-.5s2 .2 2.9.5C18 5.6 19 5.9 19 5.9c.6 1.7.2 3.1.1 3.4.7.9 1.2 2 1.2 3.4 0 4.9-2.8 6-5.5 6.3.4.3.7 1 .7 2v3c0 .3.2.7.8.6C20.6 21.8 24 17.3 24 12 24 5.4 18.6 0 12 0z"/></svg>
														</a>
									</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

