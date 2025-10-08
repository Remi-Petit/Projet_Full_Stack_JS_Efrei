import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../stores/authSlice';
import { loginUser } from '../api/authApi';
import LoginForm from '../components/LoginForm';
import { Container, Typography, Alert, Box } from '@mui/material';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  const handleLogin = async (email: string, password: string) => {
    setError('');
    try {
      const data = await loginUser(email, password);
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
          Connexion
        </Typography>
        <LoginForm onSubmit={handleLogin} />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Typography align="center" sx={{ mt: 2 }}>
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </Typography>
      </Box>
    </Container>
  );
}
