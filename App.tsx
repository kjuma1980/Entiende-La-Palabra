import React, { useState, useCallback, useEffect } from 'react';
import { fetchBibleExploration } from './services/geminiService';
import type { BibleExplorationResult } from './types';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import { SearchIcon, LogoutIcon } from './components/icons';
import { onAuthStateChanged, loginWithGoogle, logout, User } from './services/authService';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<BibleExplorationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estado de autenticación
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setAuthLoading(true);
    try {
      const user = await loginWithGoogle();
      setCurrentUser(user);
    } catch (err) {
      console.error("Login failed:", err);
      setError("No se pudo iniciar sesión. Inténtalo de nuevo.");
    } finally {
        setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setResult(null); // Limpiar resultados al cerrar sesión
    setQuery('');
  };

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Por favor, introduce un término de búsqueda.');
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await fetchBibleExploration(searchQuery);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSampleQuery = (sample: string) => {
    setQuery(sample);
    handleSearch(sample);
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} loading={authLoading} />;
  }

  return (
    <div className="min-h-screen bg-[#f3f0e9] text-gray-800 font-sans">
      <header className="bg-amber-800/10 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center gap-4">
          <form onSubmit={handleSubmit} className="w-full flex items-center gap-2 flex-grow">
            <div className="relative flex-grow">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca un pasaje, tema o pregunta (ej. 'Salmo 23')"
                className="w-full p-3 pl-4 pr-12 border border-amber-300 rounded-full bg-white/80 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-shadow"
                disabled={loading}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-amber-800 hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700 disabled:bg-gray-400 transition-colors"
                disabled={loading}
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
          <div className="flex items-center gap-2">
            {currentUser.photoURL && (
              <img src={currentUser.photoURL} alt={currentUser.displayName || 'Avatar'} className="w-10 h-10 rounded-full border-2 border-white" />
            )}
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full text-amber-800 hover:bg-amber-800/20"
              title="Cerrar sesión"
            >
              <LogoutIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="py-8 px-4">
        {loading && <LoadingSpinner />}
        {error && (
            <div className="text-center p-8 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
            </div>
        )}
        {!loading && !error && !result && <WelcomeScreen onSampleQuery={handleSampleQuery} />}
        {result && <ResultDisplay data={result} />}
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">
        <p>Potenciado por IA. Siempre compara los resultados con las Escrituras.</p>
      </footer>
    </div>
  );
};

export default App;