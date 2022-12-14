import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { validateEmail } from '../helpers/helpers';
import { auth } from './../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reset() {
  const [email, setEmail] = React.useState('');
  const [resetSuccessful, setResetSuccessful] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (validateEmail(email)) {
        await sendPasswordResetEmail(auth, email);
        setResetSuccessful(true);
      } else {
        toast.error('E-mail inválido');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {resetSuccessful ? (
          <h1>
            Request successful!
            <br /> Check your inbox.
          </h1>
        ) : (
          <>
            <h1>Reset password</h1>
            <TextField
              margin="normal"
              autoFocus
              required
              fullWidth
              label="Email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Button
              color="error"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ margin: '1rem 0', fontWeight: 'bold' }}
            >
              Reset password
            </Button>
          </>
        )}
        <Link href="/login">
          <Button
            color="success"
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ margin: '1rem 0', fontWeight: 'bold' }}
          >
            Login page
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default Reset;

export const getServerSideProps = async (context) => {
  const userID = context.req.cookies['userIDCookie'];

  if (userID) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
