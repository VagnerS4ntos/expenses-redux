import React from 'react';
import DeleteExpense from './deleteExpense';
import EditExpense from './editExpense';
import { fetchExpenses } from '../store/sliceExpenses';
import { useSelector, useDispatch } from 'react-redux';
import { getDataToRender } from '../store/sliceExpenses';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { auth } from '../firebase/firebaseConfig';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Expenses() {
  const { allData, loading, error, dataOnScreen } = useSelector(
    (state) => state.fetchExpenses,
  );
  const { year, month } = useSelector((state) => state.getDate);
  const dispatch = useDispatch();
  const userID = auth.currentUser?.uid;

  React.useEffect(() => {
    dispatch(fetchExpenses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const getCurrentData = allData
      .filter(
        (item) =>
          item.date.getFullYear() == year &&
          item.date.getMonth() == month &&
          item.user == userID,
      )
      .sort((a, b) => {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      });
    dispatch(getDataToRender(getCurrentData));
  }, [allData, dispatch, month, userID, year]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  return (
    <>
      {dataOnScreen.length ? (
        <Table
          sx={{
            margin: '2rem auto',
            border: '1px solid',
          }}
          size="small"
        >
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Valor</StyledTableCell>
              <StyledTableCell sx={{ width: '7rem', textAlign: 'center' }}>
                Ações
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataOnScreen.map((expense) => (
              <StyledTableRow key={expense.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {expense.name}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    color: `${expense.value < 0 ? 'red' : '#16A34A'}`,
                    fontWeight: 'bold',
                  }}
                >
                  {Number(expense.value).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <DeleteExpense id={expense.id} />
                  <EditExpense id={expense.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h2>No data found...</h2>
      )}
    </>
  );
}

export default Expenses;

function handleClick({ target }) {
  console.log(target);
}
