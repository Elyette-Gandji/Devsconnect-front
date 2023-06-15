import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ValidateButton() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color="success">
        Valider
      </Button>
    </Stack>
  );
}

export default ValidateButton;
