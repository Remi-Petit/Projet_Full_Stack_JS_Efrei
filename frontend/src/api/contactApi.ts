// src/api/contactApi.ts
import { ENV } from '../config/env';

export async function updateContact(id: string, data: any, token: string) {
  const res = await fetch(`${ENV.API_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
}

export async function deleteContact(id: string, token: string) {
  const res = await fetch(`${ENV.API_URL}/contacts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
}

export async function createContact(data: any, token: string) {
  const res = await fetch(`${ENV.API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
}

export async function getContacts(token: string) {
  const res = await fetch(`${ENV.API_URL}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!res.ok) {
    throw result;
  }
  return result;
}
