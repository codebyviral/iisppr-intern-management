import React from 'react';
import { Code, Database, Server, Cloud, Globe, Shield, Terminal, Cpu } from 'lucide-react';

const ScrollingLogos = () => {
  const techLogos = [
    { icon: Code, label: 'React' },
    { icon: Database, label: 'MongoDB' },
    { icon: Server, label: 'Node.js' },
    { icon: Cloud, label: 'AWS' },
    { icon: Globe, label: 'Web3' },
    { icon: Shield, label: 'Security' },
    { icon: Terminal, label: 'DevOps' },
    { icon: Cpu, label: 'AI/ML' },
  ];

  return (
    <div className="py-12 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />

      {/* Scrolling Logos */}
      <div className="flex space-x-16 animate-scroll">
        {[...techLogos, ...techLogos].map((tech, index) => {
          const Icon = tech.icon; // Assign the icon component for rendering
          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 px-8 transform hover:scale-110 transition-transform"
            >
              <Icon className="h-12 w-12 text-blue-500" />
              <span className="text-sm font-medium text-gray-400">{tech.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollingLogos;
