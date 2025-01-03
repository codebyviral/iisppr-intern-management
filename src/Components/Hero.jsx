import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Users, BookOpen, Award } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetConnected = () => {
    navigate('/signup'); // Navigate to the signup route
  };

  return (
    <div className="pt-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 blue-gradient-text">
            Trusted by 2M+ students
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Expand your skills with our trusted platform, chosen by millions worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleGetConnected} // Attach the click handler
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors glow-effect">
              Get Connected
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="h-12 w-12 text-blue-500" />,
              title: "Global Community",
              description: "Join millions of learners worldwide",
            },
            {
              icon: <BookOpen className="h-12 w-12 text-blue-500" />,
              title: "Expert-Led Content",
              description: "Learn from industry professionals",
            },
            {
              icon: <Award className="h-12 w-12 text-blue-500" />,
              title: "Verified Skills",
              description: "Earn recognized certifications",
            },
          ].map((feature, index) => (
            <div key={index} className="stats-card p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
