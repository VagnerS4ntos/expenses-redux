import React from 'react';
import { meses } from '../helpers/helpers';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectMonth() {
  const currentIndexMonth = new Date().getMonth();
  const [mes, setMes] = React.useState(meses[currentIndexMonth]);

  const handleChange = (event) => {
    setMes(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120, color: 'white', borderColor: 'white' }}>
      <FormControl fullWidth>
        <InputLabel>Mês</InputLabel>
        <Select value={mes} onChange={handleChange} size="small">
          {meses.map((mes) => (
            <MenuItem key={mes} value={mes}>
              {mes}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectMonth;
