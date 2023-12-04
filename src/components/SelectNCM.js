import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags({ allData, setSelectedNCM }) {
  const todosNCM = [...new Set(allData.map(item => item.NCM))];
  todosNCM.sort();

    const handleChange = (event, value) => setSelectedNCM(value);
  return (
    <Stack spacing={3} sx={{ margin: "10px 0 "}}>
      <Autocomplete
              multiple
              onChange={handleChange}
        id="ncm"
        options={todosNCM.map((option) => option)}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="NCM"
            fullWidth
          />
        )}
      />
    </Stack>
  );
}
