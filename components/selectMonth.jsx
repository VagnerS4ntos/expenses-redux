import React from 'react';
import { months } from '../helpers/helpers';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getMonth } from '../store/sliceDate';

function SelectMonth() {
  const dispatch = useDispatch();
  const { month } = useSelector((state) => state.getDate);

  const handleChange = ({ target }) => {
    dispatch(getMonth(target.value));
  };

  return (
    <Box sx={{ minWidth: 120, color: 'white', borderColor: 'white' }}>
      <FormControl fullWidth>
        <InputLabel>Mês</InputLabel>
        <Select value={month} onChange={handleChange} size="small">
          {months.map((month, index) => (
            <MenuItem key={month} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectMonth;
