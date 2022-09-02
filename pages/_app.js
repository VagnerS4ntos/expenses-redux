import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Container from '@mui/material/Container';
import { Provider } from 'react-redux';
import store from '../store/configureStore';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" sx={{ padding: '0 1rem' }}>
          <CssBaseline />
          <Head>
            <title>Expenses</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
