// src/pages/Home.tsx
import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import ContactList from '../components/ContactList';
import AddContactForm from '../components/AddContactForm';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <AddContactForm onContactAdded={() => setRefresh(prev => !prev)} />
        <ContactList key={refresh ? 'refresh1' : 'refresh0'} />
      </Box>
    </>
  );
}
