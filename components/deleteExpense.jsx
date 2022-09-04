import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../store/sliceExpenses';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteExpense({ id }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit() {
    try {
      await deleteDoc(doc(db, 'allExpenses', id));
      dispatch(fetchExpenses());
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section>
      <DeleteIcon
        titleAccess="Deletar"
        color="error"
        onClick={handleClickOpen}
        sx={{ cursor: 'pointer' }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Deletar despesa?</DialogTitle>
        <DialogContent>
          <DialogActions
            sx={{
              padding: 0,
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="error"
              sx={{ color: 'white' }}
              type="submit"
            >
              Sim
            </Button>
            <Button
              onClick={handleClose}
              autoFocus
              variant="contained"
              color="success"
              sx={{ color: 'white' }}
            >
              Não
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default DeleteExpense;
