import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags({ allData, setSelectedCST }) {
  const todosCST = [...new Set(allData.map(item => item.CST))];
  console.log(allData)

    const handleChange = (event, value) => setSelectedCST(value);
  return (
    <Stack spacing={3} sx={{ width: 250,margin:'20px' }}>
      <Autocomplete
              multiple
              onChange={handleChange}
        id="cst"
        options={todosCST.map((option) => option)}
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
            label="CST"
          />
        )}
      />
    </Stack>
  );
}
