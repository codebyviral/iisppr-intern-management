import React from 'react';
import { Users, TrendingUp, Globe, Award } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      number: "9,92,800",
      label: "Students on Both",
      icon: <Users className="h-8 w-8 text-blue-500" />
    },
    {
      number: "40M+",
      label: "Views on Youtube",
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />
    },
    {
      number: "2M+",
      label: "Trusted Students",
      icon: <Globe className="h-8 w-8 text-blue-500" />
    },
    {
      number: "150+",
      label: "Countries Reached",
      icon: <Award className="h-8 w-8 text-blue-500" />
    }
  ];

  return (
    <section className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold blue-gradient-text mb-4">
            Our Global Impact
          </h2>
          <p className="text-xl text-gray-400">
            Expand your skills with our trusted platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stats-card p-8 glow-effect"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-2 text-center">
                {stat.number}
              </div>
              <div className="text-gray-400 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;