import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { convertToMoney } from '../helpers/helpers';
import useMediaQuery from '@mui/material/useMediaQuery';

function Balance() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { dataOnScreen } = useSelector((state) => state.fetchExpenses);

  const allExpenses = Number(
    dataOnScreen
      .filter((item) => item.type == 'expense')
      .reduce(function (expense, acc) {
        return expense + Number(acc.value);
      }, 0),
  );

  const allIncomes = Number(
    dataOnScreen
      .filter((item) => item.type == 'income')
      .reduce(function (expense, acc) {
        return expense + Number(acc.value);
      }, 0),
  );

  const total = allIncomes + allExpenses;

  const containerStyles = {
    backgroundColor: `${prefersDarkMode ? '#333' : '#eee'}`,
    padding: '5px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    fontSize: '1.1rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    // fontSize: '1rem',
  };

  return (
    <>
      {!!dataOnScreen.length && (
        <Box component="section" sx={containerStyles}>
          <p>
            Entradas: <br />
            <Box component="span" sx={{ color: '#16A34A' }}>
              {convertToMoney(allIncomes)}
            </Box>
          </p>
          <p>
            Saídas: <br />
            <Box component="span" sx={{ color: 'red' }}>
              {convertToMoney(-allExpenses)}
            </Box>{' '}
          </p>

          <p>
            Saldo: <br />
            <Box
              component="span"
              sx={{ color: `${total < 0 ? 'red' : '#16A34A'}` }}
            >
              {convertToMoney(total)}
            </Box>
          </p>
        </Box>
      )}
    </>
  );
}

export default Balance;
