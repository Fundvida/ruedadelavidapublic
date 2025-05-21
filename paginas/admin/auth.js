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
    window.location.href = 'http://127.0.0.1:5500/index.html';
  } catch (error) {
    mostrarError(error.code);
  }
});

// REGISTRO
registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail')?.value;
  const password = document.getElementById('registerPassword')?.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Usuario registrado. Ahora puedes iniciar sesión.");
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  } catch (error) {
    mostrarError(error.code);
  }
});

// CAMBIAR ENTRE FORMULARIOS
toggleRegister?.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

cancelRegister?.addEventListener('click', (e) => {
  e.preventDefault();
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
