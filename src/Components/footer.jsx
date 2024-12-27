import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-60 border-gray-200 text-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-28">
        {" "}
        {/* Updated lg:px-16 for desktop */}
        {/* Flexbox container for "Company", "Help", "Legal", and Social Media sections */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 text-sm sm:text-base">
          {/* Company Section */}
          <div>
            <p className="font-semibold text-lg text-gray-900">Company</p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-700 transition-colors hover:text-blue-600 sm:mt-4 "
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-gray-700 transition-colors hover:text-blue-600 "
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <p className="font-semibold text-lg text-gray-900">Help</p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="/contact-support"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <p className="font-semibold text-lg text-gray-900">Legal</p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="/termsandconditions"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacypolicy"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-gray-700 transition-colors hover:text-blue-600"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <p className="font-semibold text-lg text-gray-900">Follow Us</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-600 w-5 h-5" />
                <span>Facebook</span>
              </li>
              <li className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faLinkedin} className="text-blue-700 w-5 h-5" />
                <span>LinkedIn</span>
              </li>
              <li className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faInstagram} className="text-pink-500 w-5 h-5" />
                <span>Instagram</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom Section */}
        <div className="mt-4 border-t border-gray-200 pt-4 sm:text-center">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs sm:text-sm  text-gray-600 ">
              &copy; 2024 Intern Management System. All rights reserved.
            </p>
            <ul className="mt-2 sm:mt-0 flex flex-wrap justify-start gap-6 text-xs sm:text-sm lg:justify-end">
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacypolicy"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
