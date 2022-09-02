import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getYear } from '../store/sliceDate';

function SelectYear() {
  const dispatch = useDispatch();
  const { year } = useSelector((state) => state.getDate);

  const handleChange = ({ target }) => {
    dispatch(getYear(target.value));
  };
  return (
    <Box sx={{ minWidth: 120, color: 'white', borderColor: 'white' }}>
      <FormControl fullWidth sx={{ color: 'white', borderColor: 'white' }}>
        <InputLabel>Ano</InputLabel>
        <Select value={year} onChange={handleChange} size="small">
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectYear;

const currentYear = new Date().getFullYear();
const years = [];
for (let i = 2022; i < currentYear + 4; i++) {
  years.push(i);
}
