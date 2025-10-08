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
    companyName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setSuccess('');
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: '',
      addressStreet: '',
      addressCity: '',
      addressZipcode: '',
      companyName: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    const address: any = {};
    if (form.addressStreet) address.street = form.addressStreet;
    if (form.addressCity) address.city = form.addressCity;
    if (form.addressZipcode) address.zipcode = form.addressZipcode;

    try {
      await createContact({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        address: Object.keys(address).length ? address : undefined,
        company: form.companyName ? { name: form.companyName } : undefined,
      }, token);
      setSuccess('Contact ajouté !');
      onContactAdded();
      handleClose();
    } catch (err: any) {
      if (err.errors) {
        // Adapter les erreurs imbriquées pour le formulaire
        const formattedErrors: Record<string, string> = {};
        for (const [key, value] of Object.entries(err.errors)) {
          if (key.startsWith('address.')) {
            const field = key.split('.')[1]; // Ex: "street" depuis "address.street"
            formattedErrors[`address${field.charAt(0).toUpperCase() + field.slice(1)}`] = value;
          } else if (key.startsWith('company.')) {
            const field = key.split('.')[1]; // Ex: "name" depuis "company.name"
            formattedErrors[`company${field.charAt(0).toUpperCase() + field.slice(1)}`] = value;
          } else {
            formattedErrors[key] = value;
          }
        }
        setErrors(formattedErrors);
      } else {
        setErrors({ global: err.message });
      }
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Ajouter un contact
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter un contact</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Prénom"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Nom"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Téléphone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              label="Site web"
              name="website"
              value={form.website}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.website}
              helperText={errors.website}
            />
            <TextField
              label="Rue"
              name="addressStreet"
              value={form.addressStreet}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.addressStreet}
              helperText={errors.addressStreet}
            />
            <TextField
              label="Ville"
              name="addressCity"
              value={form.addressCity}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.addressCity}
              helperText={errors.addressCity}
            />
            <TextField
              label="Code postal"
              name="addressZipcode"
              value={form.addressZipcode}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.addressZipcode}
              helperText={errors.addressZipcode}
            />
            <TextField
              label="Entreprise"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.companyName}
              helperText={errors.companyName}
            />
            {errors.global && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors.global}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
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
