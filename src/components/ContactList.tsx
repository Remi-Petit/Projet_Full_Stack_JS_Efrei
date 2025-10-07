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
} from '@mui/material';

export default function ContactList() {
  const token = useSelector((state: any) => state.auth.token);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

    if (token) fetchContacts();
  }, [token]);

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
    return <Typography align="center" sx={{ mt: 4 }}>Aucun contact trouvé.</Typography>;
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
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact: any) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}