/* eslint-disable no-unused-vars */
import React from "react";
import { FAQsData, SideNav } from "./compIndex";

const FAQ = () => {
  return (
    <div className="flex">
      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <div id="mainContent" className="p-6 lg:ml-32 ml-10 duration-300 w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
          How can I help?
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
          {FAQsData.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4 mb-4 last:border-b-0 last:pb-0"
            >
              <button
                className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
                onClick={(e) => {
                  const content = e.currentTarget.nextElementSibling;
                  if (content) {
                    content.classList.toggle("hidden");
                  }
                }}
              >
                {faq.question}
                <i className="bi bi-chevron-down text-gray-600"></i>
              </button>
              <div className="mt-2 text-gray-600 hidden">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
