import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Center the introductory section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl text-gray-900">
            Stay updated with Internships!
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            Get the latest internship opportunities, updates, and tips for your
            career journey.
          </p>
        </div>

        {/* Flexbox container for "Company", "Help", and "Legal" sections */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm sm:text-base">
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
        </div>

        {/* Social Media Icons Section */}
        <ul className="flex justify-center gap-8 mt-8">
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              <span className="sr-only">Facebook</span>
              {/* SVG Icon for Facebook */}
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              <span className="sr-only">LinkedIn</span>
              {/* SVG Icon for LinkedIn */}
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              <span className="sr-only">GitHub</span>
              {/* SVG Icon for GitHub */}
            </a>
          </li>
        </ul>
      </div>

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
    </footer>
  );
};

export default Footer;
