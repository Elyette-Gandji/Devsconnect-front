import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={20}
          defaultValue="Default Value"
        />
      </div>
    </Box>
  );
}

export default MultilineTextFields;
