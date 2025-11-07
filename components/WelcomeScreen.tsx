import React, { useState, useEffect } from 'react';
import { BookOpenIcon, LightbulbIcon } from './icons';

interface WelcomeScreenProps {
  onSampleQuery: (query: string) => void;
}

// Una lista más amplia y diversa de posibles consultas
const allSuggestions = [
  '¿Qué es el amor según 1 Corintios 13?',
  'Explica la parábola del sembrador.',
  '¿Quién fue el Rey David?',
  'Resume el libro de Génesis.',
  'Analiza el Sermón del Monte.',
  '¿Cuál es el significado de la armadura de Dios en Efesios 6?',
  'Explora el tema del perdón en la Biblia.',
  '¿Qué dice Proverbios sobre la sabiduría?',
  'La historia de Moisés y el Éxodo.',
  'El significado de "fruto del Espíritu" en Gálatas 5.',
  '¿Quiénes fueron los 12 apóstoles?',
  'Explica el concepto de la fe según Hebreos 11.',
  'La creación según Génesis 1.',
  '¿Qué es la Santa Trinidad?',
  'El rol de la mujer en la iglesia primitiva.',
  'Resume el libro de Apocalipsis.'
];

// Algoritmo de barajado Fisher-Yates para aleatorizar el array
const shuffleArray = (array: string[]) => {
  const newArray = [...array]; // Copiar para no mutar el original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSampleQuery }) => {
  const [sampleQueries, setSampleQueries] = useState<string[]>([]);

  // useEffect para generar consultas aleatorias cuando el componente se monta
  useEffect(() => {
    const shuffled = shuffleArray(allSuggestions);
    setSampleQueries(shuffled.slice(0, 4)); // Obtener las primeras 4 sugerencias aleatorias
  }, []); // El array de dependencias vacío asegura que esto se ejecute solo una vez al montar

  return (
    <div className="text-center p-8 max-w-2xl mx-auto">
      <BookOpenIcon className="w-24 h-24 mx-auto text-amber-800/50" />
      <h1 className="text-4xl font-bold text-amber-900 mt-4 font-serif">Asistente de Estudio Bíblico</h1>
      <p className="mt-4 text-lg text-gray-600">
        Bienvenido. Ingresa un tema, pasaje o pregunta en la barra de búsqueda para comenzar tu estudio.
      </p>
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-amber-900 flex items-center justify-center gap-2">
            <LightbulbIcon className="w-6 h-6" />
            <span>Sugerencias para comenzar</span>
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleQueries.map((query) => (
            <button
              key={query}
              onClick={() => onSampleQuery(query)}
              className="p-4 bg-white/60 rounded-lg shadow-sm hover:shadow-md hover:bg-white/80 transition-all text-left min-h-[80px] flex items-center"
            >
              <p className="font-medium text-amber-900">{query}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;