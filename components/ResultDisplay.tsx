
import React from 'react';
import type { BibleExplorationResult } from '../types';
import VerseCard from './VerseCard';
import { SparklesIcon, BookOpenIcon, LightbulbIcon } from './icons';

interface ResultDisplayProps {
  data: BibleExplorationResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Explanation Section */}
      <section className="bg-white/70 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-amber-900 font-serif flex items-center gap-3 mb-4">
          <SparklesIcon className="w-7 h-7 text-amber-700"/>
          <span>Explicación</span>
        </h2>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{data.explanation}</p>
      </section>

      {/* Key Verses Section */}
      {data.key_verses && data.key_verses.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-amber-900 mb-2">Versículos Clave</h3>
          {data.key_verses.map((verse, index) => (
            <VerseCard key={`key-${index}`} verse={verse} />
          ))}
        </section>
      )}

      {/* Related Verses Section */}
      {data.related_verses && data.related_verses.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-amber-900 mb-2">Pasajes Relacionados</h3>
          {data.related_verses.map((verse, index) => (
            <VerseCard key={`related-${index}`} verse={verse} />
          ))}
        </section>
      )}

      {/* Further Study Section */}
      {data.further_study_topics && data.further_study_topics.length > 0 && (
         <section className="bg-white/70 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-amber-900 font-serif flex items-center gap-3 mb-4">
              <BookOpenIcon className="w-7 h-7 text-amber-700"/>
              <span>Para Profundizar</span>
            </h2>
            <div className="space-y-4">
                {data.further_study_topics.map((topic, index) => (
                    <div key={`study-${index}`} className="border-t border-amber-200 pt-4">
                        <h4 className="font-semibold text-lg text-amber-800">{topic.topic}</h4>
                        <p className="text-gray-700 mt-1">{topic.description}</p>
                    </div>
                ))}
            </div>
        </section>
      )}
    </div>
  );
};

export default ResultDisplay;
