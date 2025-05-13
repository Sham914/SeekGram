import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const SeekGramLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#FFEB3B"/>
    <path d="M6 8C6 6.89543 6.89543 6 8 6H24C25.1046 6 26 6.89543 26 8V24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V8Z" fill="#1E40AF"/>
    <path d="M10 12L14 20L18 14L22 20" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <SeekGramLogo />
              <span className="text-xl font-bold text-gray-900">SeekGram</span>
            </div>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Connecting Kerala's tech ecosystem through events, education, and innovation. Join us in building the future of technology in Kerala.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/events" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  Colleges
                </Link>
              </li>
              <li>
                <Link to="/predictor" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  KEAM Predictor
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/privacy" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-blue-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} SeekGram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;