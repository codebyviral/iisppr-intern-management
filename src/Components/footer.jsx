import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-800 ml-36">
      <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Flexbox container for "Company", "Help", "Legal", and Social Media sections */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 text-sm sm:text-base">
          {/* Company Section */}
          <div>
            <p className="font-semibold text-lg text-gray-900">Company</p>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <p className="font-semibold text-lg text-gray-900">Help</p>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <p className="font-semibold text-lg text-gray-900">Legal</p>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <p className="font-semibold text-lg text-gray-900">Follow Us</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center space-x-2">
                {/* Facebook Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-blue-600"
                >
                  <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H8.44v-2.89h2V9.65c0-2.06 1.24-3.21 3.14-3.21.91 0 1.86.16 1.86.16v2.05h-1.05c-1.03 0-1.35.64-1.35 1.3v1.5h2.29l-.37 2.89h-1.92v6.99C18.34 21.12 22 16.99 22 12z" />
                </svg>
                <span>Facebook</span>
              </li>
              <li className="flex items-center space-x-2">
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-blue-700"
                >
                  <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M8 17v-7H5v7h3m-1.5-8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M19 17v-4.5c0-1.2-.75-1.5-1.5-1.5S16 11.3 16 12.5V17h-3v-7h3v1a3.51 3.51 0 0 1 3-1.5c2.3 0 3 1.2 3 3V17h-3z" />
                </svg>
                <span>LinkedIn</span>
              </li>
              <li className="flex items-center space-x-2">
                {/* Instagram Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-pink-500"
                >
                  <path d="M7 2H17C19.76 2 22 4.24 22 7V17C22 19.76 19.76 22 17 22H7C4.24 22 2 19.76 2 17V7C2 4.24 4.24 2 7 2M16.5 5C15.67 5 15 5.67 15 6.5S15.67 8 16.5 8 18 7.33 18 6.5 17.33 5 16.5 5M12 8A4 4 0 1 1 8 12A4 4 0 0 1 12 8M12 10A2 2 0 1 0 14 12A2 2 0 0 0 12 10Z" />
                </svg>
                <span>Instagram</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs sm:text-sm text-gray-600">
              &copy; 2024 Intern Management System. All rights reserved.
            </p>
            <ul className="mt-2 sm:mt-0 flex flex-wrap justify-start gap-6 text-xs sm:text-sm lg:justify-end">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
