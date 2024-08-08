import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

const Root: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(login(parsedUser));
    }
  }, [dispatch]);

  return null; 
}
export default Root;

