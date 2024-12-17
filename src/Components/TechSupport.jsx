import React from "react";
import staticImage from "../assets/01.jpg";
const TechSupport = () => {
  const MultiDetail = [
    { img: staticImage, text: "Intern Details", button: "Admin" },
    { img: staticImage, text: "Project Assignments", button: "Agent" },
    { img: staticImage, text: "Intern Details", button: "Took load" },
    { img: staticImage, text: "Attendance Tracking", button: "Assign" },
    { img: staticImage, text: "Task Organization", button: "Manage" },
    { img: staticImage, text: "Task Allocation", button: "Allocate" },
    { img: staticImage, text: "Task Progress Tracking", button: "Report" },
    { img: staticImage, text: "Admin Activities Management", button: "Manage" },
    { img: staticImage, text: "Task Management", button: "Organize" },
  ];
  return (
    <div className=" mx-auto max-w-screen-md ">
      <h2 className="font-semibold text-[24px] mb-6 px-8">Tech Support</h2>
      {MultiDetail.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 md:grid-cols-[75%_auto] tech-support px-8 py-2 rounded-md transition  
            ease-in-out duration-200"
        >
          <div className="grid grid-cols-[43px_auto] items-center ">
            <div className="w-[43px] h-[43px] ">
              <img
                src={item.img}
                alt=""
                className="w-full object-cover rounded-md"
              />
            </div>
            <p className="tech-detail ml-4 text-[17px] font-normal whitespace-nowrap  overflow-hidden text-ellipsis">
              {item.text}
            </p>
          </div>
          <div className="text-end flex  items-center justify-end">
            <button className="inline-block w-[140px]  bg-[#008ebf] py-1 font-normal text-[15px] rounded-full text-white">
              {item.button}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechSupport;
