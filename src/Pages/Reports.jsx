import React from "react";
import { Navbar, SideNav, Wrapper } from "@/Components/compIndex";
import { Construction, Clock, ArrowRight } from "lucide-react";

const Reports = () => {
  const features = [
    "Data Analytics Dashboard",
    "Custom Report Generation",
    "Export Functionality",
    "Interactive Charts",
  ];

  return (
    <>
      <SideNav />
      <Navbar />
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <div className="animate-bounce mb-8">
            <Construction className="w-16 h-16 text-blue-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Reports Dashboard Coming Soon
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            {`We're`} working hard to bring you a powerful reporting system. Stay
            tuned for amazing features and insights.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-md w-full">
            <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Coming Features
            </h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-pulse flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <span>In Development</span>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Reports;
