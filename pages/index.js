import React from 'react';
import SelectMonth from '../components/selectMonth';
import SelectYear from './../components/selectYear';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Expenses from './../components/expenses';
import Header from '../components/header';
import NewExpense from '../components/newExpense';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>Expenses</h1>
        <NewExpense />
        <section>
          <Box sx={{ maxWidth: '50rem', margin: '2rem auto' }}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <SelectMonth />
              </Grid>
              <Grid xs={12} sm={6}>
                <SelectYear />
              </Grid>
            </Grid>
          </Box>
        </section>
        <Expenses />
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const userID = context.req.cookies['userID'];

  if (!userID) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
