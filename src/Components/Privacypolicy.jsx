/* eslint-disable no-unused-vars */
import React from 'react';
import { SideNav,Navbar } from './compIndex';
function Privacypolicy() {
  return (
    <>
    <SideNav></SideNav>
    <Navbar></Navbar>
    <div className="p-6 max-w-screen-lg mx-auto font-sans leading-relaxed text-left overflow-y-auto h-screen bg-blue-50 shadow-lg">
      <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105">
          Privacy Policy
        </h1>

        {/* Section 1 */}
        <section className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            1. Introduction
          </h2>
          <p className="text-lg">
            The International Institute of SDGs and Public Policy Research (IISPPR) is committed to protecting
            the privacy of our website visitors, interns, fellows, and other stakeholders. This Privacy Policy
            outlines how we collect, use, disclose, and safeguard your information when you visit our website
            <a href="https://iisppr.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 no-underline">
              iisppr.in
            </a> or engage with our services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            2. Information We Collect
          </h2>
          <p className="text-lg">We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 text-lg">
            <li>Register for programs such as internships or fellowships.</li>
            <li>Apply for certificates, requiring personal identification information.</li>
            <li>Contact us with inquiries or requests, including your name, email address, and message content.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-6 p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 border border-blue-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            3. Use of Information
          </h2>
          <p className="text-lg">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-lg">
            <li>Facilitate your participation in our programs, process applications, and issue certificates.</li>
            <li>Enhance our website's functionality and tailor our services to meet your needs.</li>
            <li>Respond to your inquiries and provide updates about our programs.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            4. Sharing of Information
          </h2>
          <p className="text-lg">
            We do not sell, trade, or otherwise transfer your personal information to outside parties without
            your consent, except as required by law or to trusted third parties who assist us in operating our
            website and conducting our business, provided those parties agree to keep this information
            confidential.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-6 p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 border border-blue-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            5. Data Security
          </h2>
          <p className="text-lg">
            We implement appropriate security measures to protect your personal information from unauthorized
            access, alteration, disclosure, or destruction. However, please be aware that no method of internet
            transmission or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            6. Cookies and Tracking Technologies
          </h2>
          <p className="text-lg">
            Our website may use cookies to enhance user experience. Cookies are small data files stored on your
            device that help us understand how you use our site and improve its functionality. You can choose to
            disable cookies through your browser settings; however, this may affect your ability to use certain
            features of our website.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-6 p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 border border-blue-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            7. Third-Party Links
          </h2>
          <p className="text-lg">
            Our website may contain links to third-party sites. We are not responsible for the privacy practices
            or content of these external sites. We encourage you to review the privacy policies of any third-party
            sites you visit.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            8. Children's Privacy
          </h2>
          <p className="text-lg">
            Our services are not directed to individuals under the age of 13. We do not knowingly collect personal
            information from children under 13. If we become aware that we have inadvertently received personal
            information from a visitor under the age of 13, we will delete the information from our records.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-6 p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 border border-blue-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-lg">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other
            operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the
            new policy on our website with an updated effective date.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-2">
            10. Contact Us
          </h2>
          <p className="text-lg">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
            at:
          </p>
          <address className="text-lg">
            International Institute of SDGs and Public Policy Research (IISPPR)<br />
            Email: <a href="mailto:info@iisppr.in" className="text-blue-600 hover:underline">info@iisppr.in</a><br />
            Address: Office No 30 Nihad plaza, Opposite Zakir Hussain School, Civil lines, Near AMU, Aligarh 202001
          </address>
        </section>
      </div>
    </div>
    </>
  );
}

export default Privacypolicy;
