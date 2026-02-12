import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-sl-gray-200 bg-sl-gray-800 text-sl-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-white">
              <Shield className="h-6 w-6" />
              <span className="font-bold">National Knowledge Hub</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              An initiative by the Ministry of Information and Civic Education
              (MOICE) to provide transparent, verified government data to all
              citizens of Sierra Leone.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white">
                  Search Data
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-white">
                  Admin Portal
                </a>
              </li>
              <li>
                <a href="/contributor" className="hover:text-white">
                  Contributor Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Ministry of Information and Civic Education</li>
              <li>Youyi Building, Freetown</li>
              <li>Sierra Leone</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-sl-gray-700 pt-6 text-center text-xs text-sl-gray-400">
          &copy; {new Date().getFullYear()} Republic of Sierra Leone. All rights
          reserved. Built for transparency and public trust.
        </div>
      </div>
    </footer>
  );
}
