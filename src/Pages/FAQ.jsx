/* eslint-disable no-unused-vars */
import React from "react";
import { FAQsData, SideNav } from "../Components/compIndex";

const FAQ = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <div
        id="mainContent"
        className="w-full p-4 duration-300 lg:p-6 lg:ml-32"
      >
        <h1 className="mb-6 text-2xl font-bold text-center text-blue-600 capitalize sm:text-3xl lg:text-4xl">
          How can we help?
        </h1>
        <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-lg sm:max-w-2xl lg:max-w-4xl sm:p-8">
          {FAQsData.map((faq, index) => (
            <div
              key={index}
              className="pb-4 mb-4 border-b border-gray-300 last:border-b-0 last:pb-0"
            >
              <button
                className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 transition sm:text-lg hover:text-blue-600"
                onClick={(e) => {
                  const content = e.currentTarget.nextElementSibling;
                  if (content) {
                    content.classList.toggle("hidden");
                  }
                }}
              >
                {faq.question}
                <i className="text-gray-600 bi bi-chevron-down"></i>
              </button>
              <div className="hidden mt-2 text-sm text-gray-600 sm:text-base">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
