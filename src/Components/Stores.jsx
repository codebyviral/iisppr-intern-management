import React from "react";
import { Navbar, SideNav, Wrapper, Footer } from "@/Components/compIndex";
import { Store, ShoppingBag, TrendingUp, Package } from "lucide-react";

const Stores = () => {
  const storeFeatures = [
    "Inventory Management",
    "Sales Performance Tracking",
    "Supply Chain Integration",
    "Multi-location Support",
  ];

  return (
    <>
      <SideNav />
      <Navbar />
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <div className="animate-bounce mb-8">
            <Store className="w-16 h-16 text-amber-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Store Management Portal
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Comprehensive store management solution for your retail operations.
            Advanced features coming to optimize your business.
          </p>

          <div className="bg-amber-50 rounded-lg p-6 mb-8 max-w-md w-full">
            <h2 className="text-lg font-semibold text-amber-800 mb-4 flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Upcoming Features
            </h2>
            <ul className="space-y-3">
              {storeFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Package className="w-4 h-4 text-amber-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-pulse flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
            <span>Coming Soon</span>
          </div>
        </div>
      </Wrapper>

      <Footer />
    </>
  );
};

export default Stores;
