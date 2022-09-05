import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuid } from 'uuid';
import { auth } from './../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getNewDate, validateExpenseValue } from '../helpers/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../store/sliceExpenses';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewExpense() {
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('select');
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { year, month } = useSelector((state) => state.getDate);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setType('select');
    setValue(0);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const id = uuid();
    const newVaule = validateExpenseValue(value, type);
    try {
      if (name == '') {
        toast.error('Nome inválido');
      } else if (type == 'select') {
        toast.error('Selecione um tipo de despesa');
      } else if (value == 0) {
        toast.error('O valor deve ser diferente de zero');
      } else {
        await setDoc(doc(db, 'allExpenses', id), {
          name,
          type,
          value: newVaule,
          user: auth.currentUser.uid,
          id,
          date: getNewDate(year, month),
        });
        dispatch(fetchExpenses());
        toast.success('Despesa criada com sucesso');
        setOpen(false);
        setName('');
        setType('select');
        setValue(0);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <section>
      <Button
        variant="contained"
        color="success"
        sx={{ fontWeight: 'bold', color: 'white' }}
        onClick={handleClickOpen}
      >
        Nova despesa
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova despesa</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 1 }}>
            <TextField
              required
              fullWidth
              label="Nome"
              size="small"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <Box>
              <Select
                labelId="tipo"
                size="small"
                fullWidth
                sx={{ margin: '1rem 0' }}
                value={type}
                onChange={({ target }) => setType(target.value)}
              >
                <MenuItem value={'select'} selected disabled>
                  Selecione o tipo
                </MenuItem>
                <MenuItem value={'income'}>Entrada</MenuItem>
                <MenuItem value={'expense'}>Saída</MenuItem>
              </Select>
            </Box>

            <TextField
              required
              fullWidth
              label="Valor"
              size="small"
              type="number"
              value={value}
              onChange={({ target }) => setValue(target.value)}
            />
            <DialogActions
              sx={{
                padding: 0,
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="success"
                sx={{ color: 'white' }}
                type="submit"
              >
                Salvar
              </Button>
              <Button
                onClick={handleClose}
                autoFocus
                variant="contained"
                color="secondary"
                sx={{ color: 'white' }}
              >
                Cancelar
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default NewExpense;
