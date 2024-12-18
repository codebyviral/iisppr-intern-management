import React from 'react';
import { Users, Plus } from 'lucide-react';

export function InternListHeader() {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Manage Interns</h2>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Add New Intern
        </button>
      </div>
    </div>
  );
}