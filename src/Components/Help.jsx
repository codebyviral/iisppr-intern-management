import React from "react";

function Help(){

    const cards = [
       { title : "How to get my Offer Letter", description : (<> Visit our  <a href ="https://iisppr.org.in/internship-jd/" className="text-purple-800"><u>website</u></a>, all details are mentioned here</>), icon: "📜"},
       { title : "How will the task be assigned", description : "Messages regarding your tasks will be dropped in your Whatsapp Group by your team lead", icon: "👨🏼‍💻"},
       { title : "Where can I submit my leave application", description : "You can fill the form provided in the ___ section and you will be informed if your leave is granted" , icon: "✈️"},
       { title : "How to submit a task", description : "", icon : "✅"},
       { title : "How to submit a task", description : "", icon : "✅"},
       { title : "What if I have a Doubt", description :" Checkout the FAQ section, that can help you", icon: "🔍"}
    
    ];

    return (
        <div className  ="bg-fray-100 min-h-screen">
            <div className="text-center bg-blue-500 py-14 px-8">
                <h2 className="text-3xl font-semibold mb-4">Hello, How can we Help</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
                {cards.map((card,index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center h-60">
                        <div className="text-4xl mb-4">{card.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-gray-600">{card.description}</p>
                        </div>
                ))}
            </div>
        </div>
    );
}
export default Help;