import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  // Préremplissage rapide pour la démo
  const handleQuickFill = (account: number) => {
    if (account === 1) {
      setEmail('jolyne.kujo@gmail.com');
      setPassword('MotDePasseBienSecret123!');
    } else if (account === 2) {
      setEmail('tristepin.de.percedal@ankama.com');
      setPassword('MotDePasseBienSecret123!');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="email"
      />

      <TextField
        label="Mot de passe"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
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
