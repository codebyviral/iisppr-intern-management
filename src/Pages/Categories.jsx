import React from "react";
import { Navbar, SideNav, Wrapper, Footer } from "@/Components/compIndex";
import { FolderTree, ListFilter, Tags, Settings } from "lucide-react";

const Categories = () => {
  const categoryFeatures = [
    "Smart Category Organization",
    "Custom Classification Rules",
    "Automated Sorting",
    "Category Analytics",
  ];

  return (
    <>
      <SideNav />
      <Navbar />
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <div className="animate-bounce mb-8">
            <FolderTree className="w-16 h-16 text-green-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Category Management System
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Efficiently organize and manage your categories with our intelligent
            classification system. Enhanced features coming soon.
          </p>

          <div className="bg-green-50 rounded-lg p-6 mb-8 max-w-md w-full">
            <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center justify-center gap-2">
              <ListFilter className="w-5 h-5" />
              Planned Features
            </h2>
            <ul className="space-y-3">
              {categoryFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Tags className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-pulse flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
            <span>In Progress</span>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Categories;
