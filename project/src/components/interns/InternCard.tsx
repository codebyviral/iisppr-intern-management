import React from 'react';
import { Intern } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';

interface InternCardProps {
  intern: Intern;
}

export function InternCard({ intern }: InternCardProps) {
  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {intern.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{intern.name}</h3>
            <p className="text-sm text-gray-500">{intern.department}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              intern.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {intern.status}
          </span>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
              <Edit2 className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}