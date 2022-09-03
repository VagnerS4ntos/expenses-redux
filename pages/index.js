import React from 'react';
import SelectMonth from '../components/selectMonth';
import SelectYear from './../components/selectYear';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Expenses from './../components/expenses';
import { useSelector } from 'react-redux';

export default function Home() {
  return (
    <main>
      <h1>Expenses</h1>
      <section>
        <Box sx={{ maxWidth: '50rem', margin: '0 auto' }}>
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
  );
}
