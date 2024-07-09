import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../features/user/userSlice';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { AppDispatch, RootState } from '../app/store';

interface IFormInput {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const data = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (data?.currentUser !== null) {
      navigate('/');
    }
  }, [data?.currentUser, navigate]);

  const onSubmit: SubmitHandler<IFormInput> = (userData) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
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
            rules={{ required: 'Password is required' }}
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
