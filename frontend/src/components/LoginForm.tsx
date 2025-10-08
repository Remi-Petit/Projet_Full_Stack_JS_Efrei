import { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  // Préremplissage rapide pour la démo
  const handleQuickFill = (account: number) => {
    if (account === 1) {
      setEmail('nouvel.utilisateur@example.com');
      setPassword('MotDePasse123!');
    } else if (account === 2) {
      setEmail('compte2@example.com');
      setPassword('MotDePasse123!');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="email"
      />
      <TextField
        label="Mot de passe"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="current-password"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Se connecter
      </Button>

      {/* --- Boutons de préremplissage --- */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleQuickFill(1)}
        >
          Compte 1
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleQuickFill(2)}
        >
          Compte 2
        </Button>
      </Stack>
    </Box>
  );
}
