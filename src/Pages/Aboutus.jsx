import React, { useEffect, useRef } from "react";

import { TopNavbar, Navbar } from "../Components/compIndex";

const Aboutus = () => {
  const aboutusRef = useRef(null);

  // for animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-counsellor-card");
        }
      });
    }, 
    {
      threshold: 0.5,
    });

    const cards = document.querySelectorAll(".aboutus-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <TopNavbar />
      <div className="ml-16 aboutus-container sm:ml-64"> {/* Add margin-left to shift content */}
        {/* About Us Description Section */}
        <div className="mb-10 about-us-description">
          <h3 className="text-3xl font-bold">IISPPR</h3>
          <p className="mt-4 text-lg">
            "The International Institute of SDGs and Public Policy Research (IISPPR) is committed to advancing research and development, focusing on sustainable development goals (SDGs) through evidence-based recommendations. Our team of experts collaborates on projects related to education, public policy, and capacity building. We prioritize humanitarian assistance, supporting students and elders, and ensuring access to education, especially for those affected by the pandemic. We promote women's education and gender equality while providing career guidance and training in various fields. Our initiatives cover sustainability issues, including policy analysis on gender equality, foreign policy, and industrial ecology. Our ultimate goal is the holistic development of individuals and communities, empowering them towards a brighter, sustainable future."
          </p>
        </div>

        {/* CEO Section */}
        <div className="flex items-center mb-10 ceo-section">
          <img
            src={""} // Add CEO image URL here
            alt=""
            className="w-32 h-32 mr-6 rounded-full ceo-image"
          />
          <div className="ceo-info">
            <h3 className="text-2xl font-semibold">Nikhil Surjuse</h3>
            <p className="text-lg">Founder & CEO</p>
            <p className="text-base">Founder of Connect Counsellor. Experienced counsellor.</p>
          </div>
        </div>

        {/* Slogan Section */}
        <div className="mb-10 text-center slogan-section">
          <h2 className="text-2xl font-bold">MEET YOUR COUNSELLORS</h2>
        </div>

        {/* About Us Counsellors Section */}
        <div className="flex flex-wrap justify-between aboutus-section" ref={aboutusRef}>
          <div className="w-full mb-6 aboutus-card sm:w-1/3">
            <img
              src={""} // Add image URL here
              alt="Rajashree Navthale"
              className="object-cover w-full h-48 rounded"
            />
            <h3 className="mt-4 text-xl font-semibold">Rajashree Navthale</h3>
            <p className="text-base">Counsellor and Psychotherapist</p>
            <div className="mt-2 italic-text">
              <p>Experienced counsellor and psychotherapist with more than 2 years of experience</p>
            </div>
          </div>

          <div className="w-full mb-6 aboutus-card sm:w-1/3">
            <img
              src={""} // Add image URL here
              alt="Anupma Joshirao"
              className="object-cover w-full h-48 rounded"
            />
            <h3 className="mt-4 text-xl font-semibold">Anupma Joshirao</h3>
            <p className="text-base">Counsellor</p>
            <div className="mt-2 italic-text">
              <p>Experienced counsellor</p>
            </div>
          </div>

          <div className="w-full mb-6 aboutus-card sm:w-1/3">
            <img
              src={""} // Add image URL here
              alt="Shweta Surjuse"
              className="object-cover w-full h-48 rounded"
            />
            <h3 className="mt-4 text-xl font-semibold">Shweta Surjuse</h3>
            <p className="text-base">Counsellor</p>
            <p className="mt-2 italic-text">"Having Experience of 2.5 years in Counselling."</p>
          </div>

        </div>

        {/* Thought Section */}
        <div className="mt-10 text-center thought-section">
          <p className="text-lg italic">
            "We are a dedicated team of experienced doctors committed to providing exceptional care and support to enhance the well-being of our community."
          </p>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
