import React from "react";
import { HiPencil } from "react-icons/hi2";

const AccountDetail = () => {
  const Multidetails = [
    { title: "Full Name*", subtitle: "John Doe" },
    { title: "Company Email*", subtitle: "abc@gmail.com" },
    { title: "Account Password*", subtitle: "**********" },
    { title: "Company Name", subtitle: "Intern Hub" },
    { title: "Employee ID", subtitle: "IH-1234" },
    { title: "Current Role", subtitle: "Manager" },
  ];
  return (
    <div className=" max-w-screen-md mx-auto">
      <h2 className="font-semibold text-[24px] mb-8">Account</h2>
      <div className="p-8 bg-[#D3D3D3] rounded-[10px] ">
        <div className="relative grid grid-cols-2 sm:grid-cols-[40%_auto] ">
          {Multidetails.map((items, index) => (
            <div key={index} className="mb-3">
              <h5 className="font-bold text-[14px] mb-1">{items.title}</h5>
              <h5 className="text-[17px] font-normal">{items.subtitle}</h5>
            </div>
          ))}
          <span className="absolute top-0 right-0 ">
            <HiPencil />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
