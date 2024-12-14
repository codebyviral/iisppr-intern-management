import React from 'react';
import { Intern } from '../../types';

interface InternCardProps {
  intern: Intern;
}

export function InternCard({ intern }: InternCardProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{intern.name}</h3>
          <p className="text-sm text-gray-500">{intern.department}</p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            intern.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {intern.status}
        </span>
      </div>
    </div>
  );
}