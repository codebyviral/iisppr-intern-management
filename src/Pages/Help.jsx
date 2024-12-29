/* eslint-disable no-unused-vars */
import React from "react";
import { SideNav,Navbar } from "../Components/compIndex";
function Help() {
    
  const cards = [
    {
      title: "How to get my Offer Letter",
      description: (
        <>
          Visit our{" "}
          <a
            href="https://iisppr.org.in/internship-jd/"
            className="text-purple-800"
          >
            <u>website</u>
          </a>
          , all details are mentioned here
        </>
      ),
      icon: "📜",
    },
    {
      title: "How will the task be assigned",
      description:
        "Messages regarding your tasks will be dropped in your WhatsApp Group by your team lead",
      icon: "👨🏼‍💻",
    },
    {
      title: "Where can I submit my leave application",
      description:
        "You can fill the form provided in the ___ section and you will be informed if your leave is granted",
      icon: "✈️",
    },
    {
      title: "How to submit a task",
      description: "Instructions will be provided in the task details.",
      icon: "✅",
    },
    {
      title: "What if I have a Doubt",
      description: "Check out the FAQ section, that can help you",
      icon: "🔍",
    },
  ];

  return (
    <>
      <SideNav />
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Content starts after upper navbar */}
        <div className="flex-grow ml-0 lg:ml-36">
          {/* Help Content */}
          <main className="min-h-screen px-4 py-8">
            <div className="px-8 mb-8 text-center bg-blue-400 rounded-md py-14">
              <h2 className="mb-4 text-3xl font-semibold">Hello, How can we Help?</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md h-60"
                >
                  <div className="mb-4 text-4xl">{card.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Help;
