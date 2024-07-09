import { ChangeEvent, useState } from 'react';
import { useDispatch} from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../app/store';

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  // const Selector =useSelector((state)=>state);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { username, password };

    dispatch(registerUser(userData));
    navigate('/login');
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={3} bgcolor="white" boxShadow={3} borderRadius={5}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
