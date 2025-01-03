import React from 'react';
import { TrendingUp, Users, Building2, Award } from 'lucide-react';

const CompanyMetrics = () => {
  const metrics = [
    {
      icon: <Users className="h-8 w-8" />,
      value: '10M+',
      label: 'Active Interns',
      description: 'Globally placed and mentored'
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      value: '500+',
      label: 'Partner Companies',
      description: 'Leading tech companies trust us'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: '99.99%',
      label: 'Success Rate',
      description: 'Interns placed in top companies'
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: '50+',
      label: 'Countries',
      description: 'Global presence and impact'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Global Impact</h2>
          <p className="text-xl text-purple-100">Transforming careers worldwide</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300 hover-glow"
            >
              <div className="text-white mb-4 flex justify-center">{metric.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-xl font-semibold text-purple-100 mb-2">{metric.label}</div>
              <div className="text-purple-200">{metric.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyMetrics;