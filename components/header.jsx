import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

function Header() {
  const [userName, setUserName] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    setUserName(getCookie('userName'));
  }, []);

  async function logOut() {
    try {
      await signOut(auth);
      deleteCookie('userID');
      deleteCookie('userName');
      router.push('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <header>
      <Box>
        <Link href="/">
          <Box component="a" sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src={'/logo.png'} alt="Logo" width={50} height={50} />
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <p>{userName}</p>
        <Box
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={logOut}
        >
          <LogoutIcon />
        </Box>
      </Box>
    </header>
  );
}

export default Header;
