import React from 'react';
import { fetchExpenses } from '../store/sliceExpenses';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
  const [currentDataOnScreen, setCurrentDataOnScreen] = React.useState([]);
  const { data, loading, error } = useSelector((state) => state.fetchExpenses);
  const { year, month } = useSelector((state) => state.getDate);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchExpenses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const getCurrentData = data
      .filter(
        (item) =>
          item.date.getFullYear() == year && item.date.getMonth() == month,
      )
      .sort((a, b) => {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      });
    setCurrentDataOnScreen(getCurrentData);
  }, [data, month, year]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      {currentDataOnScreen.length ? (
        <Table
          sx={{
            maxWidth: '50rem',
            margin: '2rem auto',
            border: '1px solid',
          }}
          size="small"
        >
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Valor</StyledTableCell>
              <StyledTableCell className="actions">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentDataOnScreen.map((expense) => (
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
                <StyledTableCell sx={{ textAlign: 'center' }}>
                  <DeleteIcon titleAccess="Deletar" color="error" />
                  <EditIcon titleAccess="Editar" />
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
