/* eslint-disable no-unused-vars */
import React from "react";
import CustomNavbar from "./CustomNavbar";
function AdminHelpPage() {


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
        "Tasks can be assign through task management which is available in navbar",
      icon: "👨🏼‍💻",
    },
    {
      title: "Where can I see leave applications",
      description:
        "On the dashboard you can see leave applications ",
      icon: "✈️",
    },
    {
      title: "How to see submitted task",
      description: "you can go to submitted task through dashboard",
      icon: "✅",
    },
    {
      title: "how can i check weekly reports",
      description: "option available on navbar",
      icon: "🔍",
    },
  ];

  return (
    <>
   <CustomNavbar/>
    <div className="flex flex-col min-h-screen">
      {/* Content starts after upper navbar */}
      <div className="flex-grow ">
        {/* Help Content */}
        <main className=" min-h-screen py-8 px-4">
          <div className="text-center py-14 px-8 bg-blue-400 rounded-md mb-8">
            <h2 className="text-3xl font-semibold mb-4">Hello, How can we Help?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center h-60"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
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
export default AdminHelpPage;