import React from 'react';
import { InternList } from '../components/interns/InternList';
import { interns } from '../data/interns';

export function InternPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Intern Management</h1>
        <p className="text-gray-600">Manage and monitor all interns in the system.</p>
      </div>
      <InternList interns={interns} />
    </div>
  );
}