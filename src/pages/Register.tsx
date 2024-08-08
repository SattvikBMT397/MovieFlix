import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '../app/store';
import { IFormInput } from '../utils/Interfaces';

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = (userData) => {
    dispatch(registerUser(userData));
    navigate('/login');
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={3} bgcolor="white" boxShadow={3} borderRadius={5}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Username is required',
              minLength: { value: 4, message: 'Username must be at least 4 characters long' },
              pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters long' },
              pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: 'Password must contain at least one letter and one number' }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Register
          </Button>
        </form>
        <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={() => { navigate("/login") }}>Login</Button>
      </Box>
    </Container>
  );
}

export default Register;
