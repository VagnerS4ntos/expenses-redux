import React from 'react';
import { meses } from '../helpers/helpers';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectYear() {
  const currentYear = new Date().getFullYear();
  const [ano, setAno] = React.useState(currentYear);

  const handleChange = (event) => {
    setAno(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120, color: 'white', borderColor: 'white' }}>
      <FormControl fullWidth sx={{ color: 'white', borderColor: 'white' }}>
        <InputLabel>Ano</InputLabel>
        <Select value={ano} onChange={handleChange} size="small">
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectYear;
