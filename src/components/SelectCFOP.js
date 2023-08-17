import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags({ allData, setSelectedCFOP }) {
    const todosCFOP = [...new Set(allData.map(item => item.cfop))];

    const handleChange = (event, value) => setSelectedCFOP(value);
  return (
    <Stack spacing={3} sx={{ width: 400, margin:'20px' }}>
      <Autocomplete
              multiple
              onChange={handleChange}
        id="cfop"
        options={todosCFOP.map((option) => option)}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="CFOP"
          />
        )}
      />
    </Stack>
  );
}
