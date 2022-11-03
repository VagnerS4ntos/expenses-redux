import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCookie('userIDCookie', auth.currentUser.uid, {
        maxAge: 3600,
      });
      setCookie('userName', auth.currentUser.displayName, {
        maxAge: 3600,
      });
      router.push('/');
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
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
        <Avatar sx={{ bgcolor: '#16A34A' }}>
          <LockOutlinedIcon />
        </Avatar>
        <h1>Sign in</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            autoFocus
            required
            fullWidth
            label="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ margin: '1rem 0', fontWeight: 'bold' }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/reset" variant="body2">
                <a>
                  Forgot password? <br /> Reset{' '}
                </a>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                <a>
                  {"Don't have an account? "}
                  <br />
                  Sign Up
                </a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

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
