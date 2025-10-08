// src/components/ContactList.tsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
} from '@mui/material';
import { deleteContact, updateContact } from '../api/contactApi';
import ContactEditRow from './ContactEditRow';

export default function ContactList() {
  const token = useSelector((state: any) => state.auth.token);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors de la récupération des contacts.');
        }
        setContacts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchContacts();
    }
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
      return;
    }
    try {
      await deleteContact(id, token);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = async (data: any) => {
    try {
      await updateContact(editingId!, data, token);
      // Mise à jour manuelle du state local avec les données du formulaire
      setContacts(
        contacts.map((contact) =>
          contact._id === editingId ? { ...contact, ...data } : contact
        )
      );
      setEditingId(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (!token) {
    return <Alert severity="warning">Veuillez vous connecter pour voir les contacts.</Alert>;
  }

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!contacts.length) {
    return <Typography align="center" sx={{ my: 4 }}>Aucun contact trouvé.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Adresse</TableCell>
            <TableCell>Entreprise</TableCell>
            <TableCell>Site web</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            editingId === contact._id ? (
              <ContactEditRow
                key={`edit-${contact._id}`}
                contact={contact}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  {contact.address
                    ? `${contact.address.street}, ${contact.address.city} ${contact.address.zipcode}`
                    : ''}
                </TableCell>
                <TableCell>{contact.company?.name || ''}</TableCell>
                <TableCell>{contact.website || ''}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(contact._id)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Supprimer
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
