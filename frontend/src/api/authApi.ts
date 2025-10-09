// src/api/authApi.ts
import { ENV } from '../config/env';

export const registerUser = async (email: string, password: string) => {
  const response = await fetch(`${ENV.API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de l'inscription.");
  }

  return data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${ENV.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Email ou mot de passe incorrect.");
  }

  return data;
};