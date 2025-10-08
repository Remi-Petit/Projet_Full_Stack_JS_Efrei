import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useSelector } from 'react-redux';
import { createContact } from '../api/contactApi';

export default function AddContactButton({ onContactAdded }: { onContactAdded: () => void }) {
  const token = useSelector((state: any) => state.auth.token);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    addressStreet: '',
    addressCity: '',
    addressZipcode: '',
    company: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setSuccess('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await createContact({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        address: {
          street: form.addressStreet,
          city: form.addressCity,
          zipcode: form.addressZipcode,
        },
        company: {
          name: form.companyName,
        },
      }, token);

      setSuccess('Contact ajouté !');
      onContactAdded();
      handleClose();
    } catch (err: any) {
      // Affiche les erreurs par champ
      if (err.errors) {
        setError(Object.values(err.errors).join(' '));
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Ajouter un contact
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter un contact</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField label="Prénom" name="firstName" value={form.firstName} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Nom" name="lastName" value={form.lastName} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Téléphone" name="phone" value={form.phone} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Site web" name="website" value={form.website} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Rue" name="addressStreet" value={form.addressStreet} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Ville" name="addressCity" value={form.addressCity} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Code postal" name="addressZipcode" value={form.addressZipcode} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Entreprise" name="companyName" value={form.companyName} onChange={handleChange} fullWidth margin="normal" />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
