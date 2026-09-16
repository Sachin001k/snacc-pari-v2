import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SNACC PARI - Student Nutrition Access Risk Index",
  description: "Understanding nutritional challenges in schools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                SNACC PARI
              </Link>
              <ul className="flex gap-6 text-sm font-medium">
                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                <li><Link href="/survey" className="hover:text-blue-600">Survey</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
                <li><Link href="/about" className="hover:text-blue-600">Research</Link></li>
                <li><Link href="/admin" className="hover:text-blue-600">Admin</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-50 border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center gap-6 mb-4 text-sm">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                Research
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </div>
            <p className="text-center text-sm text-gray-600">
              &copy; 2026 SNACC PARI. Anonymous screening tool.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
