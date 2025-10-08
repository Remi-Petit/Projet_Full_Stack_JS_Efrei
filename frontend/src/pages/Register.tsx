import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../stores/authSlice';
import RegisterForm from '../components/RegisterForm';
import { Container, Typography, Alert, Box } from '@mui/material';

export default function Register() {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription.");
      }

      dispatch(setToken(data.token));
      dispatch(setUser(data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Inscription
        </Typography>
        <RegisterForm onSubmit={handleRegister} />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Typography align="center" sx={{ mt: 2 }}>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </Typography>
      </Box>
    </Container>
  );
}