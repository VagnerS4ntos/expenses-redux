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
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../store/sliceExpenses';
import EditIcon from '@mui/icons-material/Edit';
import { validateExpenseValue } from '../helpers/helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditExpense({ id }) {
  const [editName, setEditName] = React.useState('');
  const [editType, setEditType] = React.useState('select');
  const [editValue, setEditValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { data } = useSelector((state) => state.fetchExpenses);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    const currentExpense = data.filter((item) => item.id == id);
    const { name, type, value } = currentExpense[0];
    setEditName(name);
    setEditType(type);
    setEditValue(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await updateDoc(doc(db, 'allExpenses', id), {
        name: editName,
        type: editType,
        value: validateExpenseValue(editValue, editType),
      });
      dispatch(fetchExpenses());
      toast.success('Despesa atualizada com sucesso');
      setOpen(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <section>
      <EditIcon
        variant="contained"
        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar despesa</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 1 }}>
            <TextField
              required
              fullWidth
              label="Nome"
              size="small"
              value={editName}
              onChange={({ target }) => setEditName(target.value)}
            />
            <Box>
              <Select
                labelId="tipo"
                size="small"
                fullWidth
                sx={{ margin: '1rem 0' }}
                value={editType}
                onChange={({ target }) => setEditType(target.value)}
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
              value={editValue}
              onChange={({ target }) => setEditValue(target.value)}
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
                color="warning"
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

export default EditExpense;
