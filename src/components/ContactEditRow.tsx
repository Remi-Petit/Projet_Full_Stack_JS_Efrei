// src/components/ContactEditRow.tsx
import { TableCell, TableRow, TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

export default function ContactEditRow({
  contact,
  onSave,
  onCancel,
}: {
  contact: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    address: { ...contact.address },
    company: { ...contact.company },
    website: contact.website,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in form.address) {
      setForm({
        ...form,
        address: { ...form.address, [name]: value },
      });
    } else if (name in form.company) {
      setForm({
        ...form,
        company: { ...form.company, [name]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="street"
          value={form.address?.street || ''}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="Rue"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="name"
          value={form.company?.name || ''}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="Entreprise"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="website"
          value={form.website || ''}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="Site web"
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit}
          >
            Enregistrer
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={onCancel}
          >
            Annuler
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}
