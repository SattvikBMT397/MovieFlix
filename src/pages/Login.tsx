import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../features/user/userSlice';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { RootState } from '../app/store';

const Login: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  
  const data = useSelector((state: RootState) => state.user); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (data?.currentUser !== null) {
      navigate('/');
    }
  }, [data?.currentUser, navigate]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { username, password };
    try {
      dispatch(authenticateUser(userData));
    } catch (error) {
      // console.log(error.message); 
    }
  };

  const handleRegisterNavigation = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={3} bgcolor="white" boxShadow={3} borderRadius={5}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
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
            Login
          </Button>
        </form>
        <Button onClick={handleRegisterNavigation} color="secondary" fullWidth style={{ marginTop: '10px' }}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
