import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Avatar, Button, Box } from '@mui/material';
import { clearAuth } from '../stores/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Avatar
            alt="Profil"
            src={user?.avatar || ''}
            sx={{ mr: 2 }}
          >
            {user?.email ? user.email[0].toUpperCase() : ''}
          </Avatar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user?.email || 'Non connecté'}
          </Typography>
          {token && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Accueil
        </Typography>
        <Typography>
          Token : {token ? token : 'Non connecté'}
        </Typography>
        <Typography>
          Utilisateur : {user ? JSON.stringify(user) : 'Non connecté'}
        </Typography>
      </Box>
    </>
  );
}