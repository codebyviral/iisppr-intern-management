import React from 'react';
import { InternCard } from './InternCard';
import { InternListHeader } from './InternListHeader';
import { Intern } from '../../types';

interface InternListProps {
  interns: Intern[];
}

export function InternList({ interns }: InternListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <InternListHeader />
      <div className="divide-y divide-gray-200">
        {interns.map((intern) => (
          <InternCard key={intern.id} intern={intern} />
        ))}
      </div>
    </div>
  );
}