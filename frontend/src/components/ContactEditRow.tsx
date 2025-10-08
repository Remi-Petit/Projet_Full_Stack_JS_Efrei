import { useState } from 'react';
import { TableRow, TableCell, TextField, Button, Box } from '@mui/material';

export default function ContactEditRow({ contact, onSave, onCancel }: any) {
  const [form, setForm] = useState({
    firstName: contact.firstName || '',
    lastName: contact.lastName || '',
    email: contact.email || '',
    phone: contact.phone || '',
    website: contact.website || '',
    street: contact.address?.street || '',
    city: contact.address?.city || '',
    zipcode: contact.address?.zipcode || '',
    company: contact.company?.name || '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error on change
  };

  const handleSave = async () => {
    try {
      await onSave({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        address: {
          street: form.street,
          city: form.city,
          zipcode: form.zipcode,
        },
        company: { name: form.company },
      });
      setErrors({});
    } catch (err: any) {
      if (err.errors) {
        setErrors(err.errors); // backend errors par champ
      }
    }
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="street"
          value={form.street}
          onChange={handleChange}
          error={!!errors['address.street']}
          helperText={errors['address.street']}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="city"
          value={form.city}
          onChange={handleChange}
          error={!!errors['address.city']}
          helperText={errors['address.city']}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="zipcode"
          value={form.zipcode}
          onChange={handleChange}
          error={!!errors['address.zipcode']}
          helperText={errors['address.zipcode']}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="company"
          value={form.company}
          onChange={handleChange}
          error={!!errors['company.name']}
          helperText={errors['company.name']}
        />
      </TableCell>
      <TableCell>
        <TextField
          name="website"
          value={form.website}
          onChange={handleChange}
          error={!!errors.website}
          helperText={errors.website}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="primary" size="small" onClick={handleSave}>
            Sauvegarder
          </Button>
          <Button variant="outlined" color="secondary" size="small" onClick={onCancel}>
            Annuler
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}
