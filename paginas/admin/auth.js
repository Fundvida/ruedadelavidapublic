import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// FORMULARIOS
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registrationForm');
const toggleRegister = document.getElementById('registerLink');
const cancelRegister = document.getElementById('cancelRegister');
const errorMessage = document.getElementById('errorMessage');

// LOGIN
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    mostrarError(error.code);
  }
});

// ESTADO USUARIO
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Si estás en la página de login, redirige a index.html
    if (window.location.pathname.includes('login.html')) {
      console.log("Redirigiendo de login.html a index.html...");
      window.location.href = '/index.html';
    }
  }
});

// REGISTRO
registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail')?.value;
  const password = document.getElementById('registerPassword')?.value;

  if (!password || password.length < 6) {
    errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
    errorMessage.style.display = 'block';
    errorMessage.classList.remove('text-green-600');
    errorMessage.classList.add('text-red-500');
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    errorMessage.textContent = "Usuario registrado. Ahora puedes iniciar sesión.";
    errorMessage.style.display = 'block';
    errorMessage.classList.remove('text-red-500');
    errorMessage.classList.add('text-green-600');
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  } catch (error) {
    mostrarError(error.code);
  }
});

function limpiarMensaje() {
  errorMessage.textContent = '';
  errorMessage.style.display = 'none';
  errorMessage.classList.remove('text-green-600', 'text-red-500');
}

// CAMBIAR ENTRE FORMULARIOS
toggleRegister?.addEventListener('click', (e) => {
  e.preventDefault();
  limpiarMensaje();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

cancelRegister?.addEventListener('click', (e) => {
  e.preventDefault();
  limpiarMensaje();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

function mostrarError(codigo) {
  const mensajes = {
    'auth/invalid-email': 'Correo electrónico no válido.',
    'auth/user-not-found': 'Usuario no encontrado.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/email-already-in-use': 'Este correo ya está en uso.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  };
  errorMessage.textContent = mensajes[codigo] || 'Error inesperado.';
  errorMessage.style.display = 'block';
}
