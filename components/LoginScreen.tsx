import React from 'react';
import { BookOpenIcon, GoogleIcon } from './icons';

interface LoginScreenProps {
  onLogin: () => void;
  loading: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f0e9] p-4 text-center">
      <div className="max-w-md w-full bg-white/60 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
        <BookOpenIcon className="w-20 h-20 mx-auto text-amber-800" />
        <h1 className="text-3xl font-bold text-amber-900 mt-4 font-serif">Asistente de Estudio Bíblico</h1>
        <p className="mt-2 text-gray-600">
          Inicia sesión para comenzar tu viaje de estudio y descubrimiento en las Escrituras.
        </p>
        <div className="mt-8">
          <button
            onClick={onLogin}
            disabled={loading}
            className="w-full inline-flex justify-center items-center gap-4 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-800 hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white"></div>
                <span>Iniciando...</span>
              </>
            ) : (
              <>
                <GoogleIcon className="w-6 h-6" />
                <span>Continuar con Google</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-6 text-xs text-gray-500">
          Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;