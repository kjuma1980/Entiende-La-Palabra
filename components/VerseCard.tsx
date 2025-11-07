
import React from 'react';
import type { BibleVerse } from '../types';

interface VerseCardProps {
  verse: BibleVerse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  return (
    <div className="border-l-4 border-amber-700 pl-4 py-2 my-4 bg-white/50 rounded-r-md">
      <p className="text-gray-700 italic">"{verse.text}"</p>
      <p className="text-right text-amber-900 font-semibold mt-2">{verse.reference}</p>
    </div>
  );
};

export default VerseCard;
