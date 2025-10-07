// src/components/Navbar.tsx
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { clearAuth } from '../stores/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles'; // Import de useTheme

export default function Navbar() {
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme(); // Utilisation de useTheme
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Utilisation de theme.breakpoints

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
    handleCloseMenu();
  };

  const handleCopyToken = async () => {
    if (token) {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
    handleCloseMenu();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar alt="Profil" src={user?.avatar || ''} sx={{ mr: 2 }}>
          {user?.email ? user.email[0].toUpperCase() : ''}
        </Avatar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {user?.email || 'Non connecté'}
        </Typography>

        {isMobile ? (
          // Version mobile : Burger menu
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              keepMounted
            >
              {token && (
                <>
                  <MenuItem onClick={handleCopyToken}>
                    <Tooltip title={copied ? "Copié !" : "Copier le token"}>
                      <Typography textAlign="center">Token</Typography>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          // Version desktop : Boutons classiques
          <>
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
