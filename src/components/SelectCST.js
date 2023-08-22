import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags({ allData, setSelectedCST }) {
  const todosCST = [...new Set(allData.map(item => item.CST))];

    const handleChange = (event, value) => setSelectedCST(value);
  return (
    <Stack spacing={3} sx={{ margin: "10px 0 "}}>
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
            label="CST"
            fullWidth
          />
        )}
      />
    </Stack>
  );
}
