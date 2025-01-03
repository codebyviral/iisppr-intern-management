import React from 'react';
import { Code2, Database, Globe, Server, Cloud, Shield, Terminal } from 'lucide-react';

const TechStack = () => {
  const technologies = [
    { name: 'Frontend', Icon: Code2 },
    { name: 'Backend', Icon: Server },
    { name: 'Cloud', Icon: Cloud },
    { name: 'Database', Icon: Database },
    { name: 'Security', Icon: Shield },
    { name: 'DevOps', Icon: Terminal },
  ];

  return (
    <section className="py-20 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold blue-gradient-text mb-4">
            Cutting-Edge Tech Stack
          </h2>
          <p className="text-xl text-gray-400">
            Master the technologies that power modern software
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="stats-card p-6 flex flex-col items-center hover:-translate-y-2 transition-transform"
            >
              <tech.Icon className="h-8 w-8 text-blue-500" />
              <span className="mt-4 text-gray-300 font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
