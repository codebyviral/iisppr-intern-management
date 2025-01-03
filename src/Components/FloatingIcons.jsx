import React from 'react';
import { Code, Database, Terminal, Cpu, GitBranch, Globe } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: Code, delay: '0s' },
    { Icon: Database, delay: '2s' },
    { Icon: Terminal, delay: '4s' },
    { Icon: Cpu, delay: '1s' },
    { Icon: GitBranch, delay: '3s' },
    { Icon: Globe, delay: '5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {icons.map(({ Icon, delay }, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: delay,
            opacity: 0.1,
          }}
        >
          <Icon className="h-12 w-12 text-blue-600" />
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;