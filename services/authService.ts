// --- SIMULATED AUTH SERVICE ---
// En una aplicación real, aquí importarías y configurarías Firebase.
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Simula un usuario logueado
const FAKE_USER: User = {
    uid: '12345abcde',
    displayName: 'Usuario de Prueba',
    email: 'test@example.com',
    photoURL: 'https://i.pravatar.cc/150?u=testuser'
};

/**
 * Simula el inicio de sesión con Google.
 * En una implementación real, esto abriría el popup de Google.
 */
export const loginWithGoogle = (): Promise<User> => {
  console.log('Simulating Google login...');
  return new Promise((resolve) => {
    setTimeout(() => {
      // Guarda el usuario falso en localStorage para simular una sesión persistente
      localStorage.setItem('authUser', JSON.stringify(FAKE_USER));
      resolve(FAKE_USER);
    }, 1000);
  });
};

/**
 * Simula el cierre de sesión.
 */
export const logout = (): Promise<void> => {
  console.log('Simulating logout...');
  return new Promise((resolve) => {
    setTimeout(() => {
      // Elimina el usuario de localStorage
      localStorage.removeItem('authUser');
      resolve();
    }, 500);
  });
};

/**
 * Simula el observador de estado de autenticación de Firebase.
 * Llama al callback con el usuario si hay una sesión activa, o con null si no la hay.
 */
export const onAuthStateChanged = (callback: (user: User | null) => void): (() => void) => {
  const user = localStorage.getItem('authUser');
  callback(user ? JSON.parse(user) : null);

  const handleStorageChange = () => {
    const user = localStorage.getItem('authUser');
    callback(user ? JSON.parse(user) : null);
  };
  
  // Escucha cambios en otras pestañas
  window.addEventListener('storage', handleStorageChange);

  // Devuelve una función para "desuscribirse" del listener, imitando el comportamiento de Firebase.
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};