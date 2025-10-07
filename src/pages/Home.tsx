import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Avatar, Button, Box, Tooltip } from '@mui/material';
import { clearAuth } from '../stores/authSlice';
import { useNavigate } from 'react-router-dom';
import ContactList from '../components/ContactList';
import AddContactForm from '../components/AddContactForm';
import { useState } from 'react';

export default function Home() {
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  const handleCopyToken = async () => {
    if (token) {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
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
            <>
              <Tooltip title={copied ? "Copié !" : "Copier le token"}>
                <Button color="inherit" onClick={handleCopyToken} sx={{ mr: 2 }}>
                  Token
                </Button>
              </Tooltip>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <AddContactForm onContactAdded={() => setRefresh(r => !r)} />
        <ContactList key={refresh ? 'refresh1' : 'refresh0'} />
      </Box>
    </>
  );
}