import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#212529] text-gray-400 pt-4 md:pt-8">
        <div className="container mx-auto px-5 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logo + socials */}
            <div>
              <Link href="/" className="inline-block mb-6">
                <img src="/img/logo-white.png" alt="Firma dla Kazdego - logo" width={200} height={82} className="max-w-[200px]" />
              </Link>
              <div className="flex gap-4 mt-6">
                <a href="https://www.facebook.com/firmadlakazdego" target="_blank" rel="nofollow noopener" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                  <svg width="28" height="28" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.1384 15.0873C30.1384 6.93094 23.3963 0.327148 15.0692 0.327148C6.74208 0.327148 0 6.93094 0 15.0873C0 22.4564 5.51421 28.5572 12.7251 29.6724V19.3513H8.88525V15.0873H12.7251V11.8291C12.7251 8.13361 14.9576 6.09999 18.4179 6.09999C20.07 6.09999 21.789 6.38426 21.789 6.38426V10.0142H19.869C17.9938 10.0142 17.4133 11.1512 17.4133 12.3102V15.0873H21.588L20.9183 19.3513H17.4133V29.6724C24.6242 28.5572 30.1384 22.4564 30.1384 15.0873Z" fill="#ffffff"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="nofollow noopener" aria-label="Telegram" className="hover:opacity-80 transition-opacity">
                  <svg width="28" height="28" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm-1.33048041-6.37283475 3.70945371-3.34749858c.1628067-.14449267-.0355533-.21495334-.25168-.08389334l-4.57819997 2.88833334-1.97753333-.61722c-.42706-.13076-.43012667-.42422.09588-.6352l7.706-2.9714c.3519533-.15978667.6916533.08453333.5572933.62321333l-1.3123333 6.1842c-.09164.43946-.3571667.54456-.72506667.3415667l-1.99909645-1.4769586-.96090355.9343586c-.11163333.1085333-.2.2-.4.2l.13613334-2.03953337z" fill="#fff"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/firmadlakazdego" target="_blank" rel="nofollow noopener" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                  <svg width="28" height="28" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.3336 30C23.7248 30 30.5188 23.2889 30.5188 15C30.5188 6.71111 23.7248 0 15.3336 0C6.9424 0 0.148438 6.71111 0.148438 15C0.148438 23.2889 6.9424 30 15.3336 30ZM8.79824 9.60006C9.98247 9.60006 10.9433 8.63927 10.9433 7.45505C10.9433 6.29317 9.96012 5.33238 8.79824 5.33238C7.61402 5.33238 6.65323 6.29317 6.65323 7.47739C6.65323 8.63928 7.63636 9.60006 8.79824 9.60006ZM10.6527 17.2193V22.8947C10.6527 23.0958 10.608 23.1628 10.3846 23.1628H7.16703C6.98828 23.1628 6.94359 23.1181 6.94359 22.9394V11.477C6.94359 11.3206 6.98828 11.2535 7.14469 11.2535H10.4069C10.608 11.2535 10.6527 11.3429 10.6527 11.5217V17.2193ZM16.7945 12.5524L16.663 22.9394C16.663 23.1405 16.6183 23.1852 16.4172 23.1852H13.1774C12.9986 23.1852 12.9539 23.1405 12.9539 22.9617V11.4993C12.9539 11.3205 13.021 11.2759 13.1997 11.2759H16.2832C16.4619 11.2759 16.529 11.3429 16.5289 11.5216V12.8623C17.244 12.0579 18.9421 10.9407 20.0369 10.963C20.6402 10.963 21.2212 11.0077 21.7798 11.1865C23.098 11.5663 23.8577 12.4601 24.2152 13.756C24.4834 14.7168 24.5281 15.6999 24.5281 16.6831V22.9394C24.5281 23.1405 24.4834 23.1852 24.2823 23.1852H21.0648C20.8637 23.1852 20.8413 23.1181 20.8413 22.9394V16.9959C20.8413 16.5043 20.7966 16.0128 20.6626 15.5212C20.3944 14.6274 19.7688 14.1806 18.8304 14.2253C17.5568 14.2923 16.8865 14.9179 16.73 16.2139C16.6854 16.5267 16.663 16.8395 16.663 17.1523L16.7945 12.5524Z" fill="#ffffff"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="sm:text-center">
              <div className="inline-block text-left">
                <ul className="space-y-3">
                  <li><Link href="/dla-pracodawcow" className="text-gray-400 hover:text-white transition-colors">Dla Pracodawcow</Link></li>
                  <li><Link href="/dla-cudzoziemcow" className="text-gray-400 hover:text-white transition-colors">Cudzoziemcy</Link></li>
                  <li><Link href="/kontakt" className="text-gray-400 hover:text-white transition-colors">Kontakt</Link></li>
                  <li><Link href="/#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/regulamin" className="text-gray-400 hover:text-white transition-colors">Regulamin</Link></li>
                  <li><Link href="/oplaty" className="text-gray-400 hover:text-white transition-colors">Oplaty</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="sm:text-center">
              <div className="inline-block text-left">
                <h5 className="text-gray-400 font-semibold mb-3">Kontakt</h5>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 items-center mb-3">
                  <span className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    PL
                  </span>
                  <a className="text-gray-400 hover:text-white transition-colors" href="tel:+48575594500">+48 575 594 500</a>
                  <span className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3m0 0a5 5 0 00-5 5m5-5a5 5 0 015 5M8 14s1.5 2 4 2 4-2 4-2" /></svg>
                    EN / UA / RU
                  </span>
                  <a className="text-gray-400 hover:text-white transition-colors" href="tel:+48794731000">+48 794 731 000</a>
                </div>
                <p className="mb-1">
                  <a className="text-gray-400 hover:text-white transition-colors" href="mailto:kontakt@firmadlakazdego.pl">kontakt@firmadlakazdego.pl</a>
                  <span className="text-gray-600 text-xs ml-1">(PL i ENG)</span>
                </p>
                <p className="mb-1">
                  <a className="text-gray-400 hover:text-white transition-colors" href="mailto:administracja@firmadlakazdego.pl">administracja@firmadlakazdego.pl</a>
                  <span className="text-gray-600 text-xs ml-1">(UKR i RUS)</span>
                </p>
                <p className="mb-4">
                  <a className="text-gray-400 hover:text-white transition-colors" href="mailto:b2b@firmadlakazdego.pl">b2b@firmadlakazdego.pl</a>
                  <span className="text-gray-600 text-xs ml-1">(dla Kontrahentow)</span>
                </p>

                <p className="text-gray-400 mb-0">
                  <strong className="text-gray-300">Fundacja Firma Dla Kazdego</strong><br/>
                  ul. Lwowska 17/4<br/>
                  00-660 Warszawa<br/>
                  NIP: 5252625624
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="container mx-auto px-5 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center text-sm text-[var(--body-color)] gap-2">
            <div>Copyright &copy; {new Date().getFullYear()} Firma Dla Kazdego</div>
            <div>All right reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
