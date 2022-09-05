import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { convertToMoney } from '../helpers/helpers';

function Balance() {
  const { dataOnScreen } = useSelector((state) => state.fetchExpenses);
  const [expenses, setExpenses] = React.useState(0);
  const [incomes, setIncomes] = React.useState(0);
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    const allExpenses = Number(
      dataOnScreen
        .filter((item) => item.type == 'expense')
        .reduce(function (expense, acc) {
          return expense + Number(acc.value);
        }, 0),
    );
    setExpenses(allExpenses);

    const allIncomes = Number(
      dataOnScreen
        .filter((item) => item.type == 'income')
        .reduce(function (expense, acc) {
          return expense + Number(acc.value);
        }, 0),
    );
    setIncomes(allIncomes);
    setBalance(allExpenses + allIncomes);
  }, [dataOnScreen]);

  const containerStyles = {
    backgroundColor: '#333',
    padding: '5px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    fontSize: '1.1rem',
    borderRadius: '5px',
    fontWeight: 'bold',
  };

  return (
    <>
      {!!dataOnScreen.length && (
        <Box component="section" sx={containerStyles}>
          <div>
            <p>
              Saídas:{' '}
              <Box component="span" sx={{ color: 'red' }}>
                {convertToMoney(-expenses)}
              </Box>{' '}
            </p>
            <p>
              Entradas:{' '}
              <Box component="span" sx={{ color: '#16A34A' }}>
                {convertToMoney(incomes)}
              </Box>
            </p>
          </div>

          <p>
            Saldo:{' '}
            <Box
              component="span"
              sx={{ color: `${balance < 0 ? 'red' : '#16A34A'}` }}
            >
              {convertToMoney(balance)}
            </Box>
          </p>
        </Box>
      )}
    </>
  );
}

export default Balance;
