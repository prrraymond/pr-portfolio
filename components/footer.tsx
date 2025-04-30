import Link from "next/link"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 mt-16 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Paul-Renaud Raymond</h3>
            <p className="text-gray-600 max-w-md font-normal">
              Intellectually curious & strategic "athlete" with a passion for analytics, design, and driving positive
              impact.
            </p>
          </div>

          <div className="flex space-x-4">
            <Link
              href="mailto:contact@example.com"
              className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm font-normal">
          <p>&copy; {new Date().getFullYear()} Paul-Renaud Raymond. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
