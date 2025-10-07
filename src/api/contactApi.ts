// src/api/contactApi.ts
export const deleteContact = async (id: string, token: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression.");
  return response.json();
};

export const updateContact = async (id: string, data: any, token: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erreur lors de la mise à jour.");
  return response.json();
};
