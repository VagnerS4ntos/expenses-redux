import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { setCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function SignUp() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      setCookies('userID', auth.currentUser.uid, {
        maxAge: 3600, // Will expire after 1hr (value is in number of sec.)
      });
      setCookies('userName', auth.currentUser.displayName, {
        maxAge: 3600,
      });
      router.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: '#1E90FF' }}>
          <LockOutlinedIcon />
        </Avatar>
        <h1>Sign up</h1>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            autoFocus
            required
            fullWidth
            label="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Grid container columnSpacing={{ xs: 0, sm: 2 }}>
            <Grid xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="E-mail"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm e-mail"
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={{ xs: 0, sm: 2 }}>
            <Grid xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm password"
                type="password"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ margin: '1rem 0', fontWeight: 'bold' }}
          >
            Sign up
          </Button>
          <Grid container sx={{ justifyContent: 'end' }}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export const getServerSideProps = async (context) => {
  const userID = context.req.cookies['userID'];

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
