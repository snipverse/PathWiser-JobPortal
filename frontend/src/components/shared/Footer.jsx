

const Footer = () => {
  return (
      <footer className="bg-white/80 rounded-t-2xl shadow-lg border-t border-gray-100 glass-effect py-6 sm:py-8 mt-10 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="mb-2 sm:mb-0 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold text-blue-700">PathWiser</h2>
              <p className="text-xs sm:text-sm text-gray-500">© {new Date().getFullYear()} Your Company. All rights reserved. Made in India with ❤️</p>
          </div>
            <div className="flex space-x-4 mt-2 sm:mt-0 justify-center">
            <a href="https://facebook.com" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
              </svg>
            </a>
            <a href="https://x.com" className="hover:text-blue-600 transition-colors" aria-label="X">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2H21.5l-7.6 8.7L22 22h-6.8l-5.3-6.7L4.2 22H1l8.1-9.3L2 2h6.9l4.8 6.1L18.244 2zM16.5 20h1.8L7.6 4H5.7L16.5 20z" />
              </svg>
            </a>
            <a href="https://linkedin.com" className="hover:text-blue-600 transition-colors" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;