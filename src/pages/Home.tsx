import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.json';
import { AppBar, Toolbar, Typography, Container, Card, CardMedia, CardContent, Grid, Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { addFavorite, removeFavorite, saveFavoritesToLocalForage, selectFavorites } from '../features/favorites/favoritesSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RootState, AppDispatch } from '../app/store';
import { Movie } from '../utils/Interfaces';

const Home: React.FC = () => {
  const data: Movie[] = api as Movie[];
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const Validation = useSelector((state: RootState) => state.user.currentUser);
  const favorites = useSelector(selectFavorites);

  const handleCardClick = (id: string) => {
    if (Validation) {
      navigate(`/details/${id}`);
    } else {
      alert("Please Login");
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddFavorite = (movie: Movie) => {
    if (Validation) {
      dispatch(addFavorite(movie));
      dispatch(saveFavoritesToLocalForage(Validation.username, [...favorites, movie]));
    } else {
      alert("Please Login");
    }
  };

  const handleRemoveFavorite = (movie: Movie) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    dispatch(removeFavorite(movie));
    dispatch(saveFavoritesToLocalForage(Validation.username, updatedFavorites));
  };

  const filteredData = data.filter(movie =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container style={{ minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" style={{
            fontSize: '35px',
            fontFamily: "cursive",
            color: 'black',
            fontWeight: 'bold',
          }}>
            MovieFlix
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Search Movies"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginRight: '10px' }}
            />
            {Validation ? (
              <Button variant="contained" style={{
                backgroundColor: '#ff9800',
                color: 'black',
                fontWeight: 'bold',
              }} onClick={() => dispatch(logout())}>
                Logout
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" style={{
                  backgroundColor: '#ff9800',
                  color: 'black',
                  fontWeight: 'bold',
                }} onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="contained" style={{
                  backgroundColor: '#ff9800',
                  color: 'black',
                  fontWeight: 'bold',
                }} onClick={() => navigate('/register')}>
                  Register
                </Button>
              </Box>
            )}
            <Button variant="text" onClick={() => navigate('/favorites')}>
              <FavoriteIcon fontSize='large' />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {filteredData.length > 0 ? (
            filteredData.map((movie, index) => (
              <Grid item xs={12} key={index}>
                <Card elevation={3} style={{ display: 'flex', flexDirection: 'row', minHeight: '250px' }} onClick={() => handleCardClick(movie.imdbID)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <CardMedia
                        component="img"
                        alt={movie.Title}
                        height="400"
                        image={movie.Poster}
                        title={movie.Title}
                        sx={{
                          width: '100%',
                          objectFit: 'cover',
                          borderTopLeftRadius: '10px',
                          borderTopRightRadius: '10px',
                          minWidth: '250px'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <CardContent>
                        <Typography variant="h5" component="div" style={{
                          fontWeight: 'bold',
                          color: 'red'
                        }}>
                          {movie.Title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {movie.Year} | {movie.Rated} | {movie.Runtime}
                        </Typography>
                        <Box mt={2}>
                          <Typography variant="body1">
                            <strong>Genre:</strong> {movie.Genre}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Director:</strong> {movie.Director}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Actors:</strong> {movie.Actors}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Description:</strong> {movie.Plot}
                          </Typography>
                        </Box>
                        <Box mt={2}>
                          <Typography variant="body1">
                            <strong>IMDB Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)
                          </Typography>
                        </Box>
                        {!favorites.some(favorite => favorite.imdbID === movie.imdbID) ? (
                          <Button variant="contained" style={{ marginTop: '20px', backgroundColor: 'brown' }} onClick={(e) => {
                            e.stopPropagation();
                            handleAddFavorite(movie);
                          }}>Add to Favorite</Button>
                        ) : (
                          <Button variant="contained" style={{ marginTop: '20px', backgroundColor: 'brown' }} onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(movie);
                          }}>Remove from Favorite</Button>
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant='h6' color="textSecondary" align='center' sx={{ margin: '30px' }}>
              No movies found.
            </Typography>
          )}
        </Grid>
      </Container>
    </Container>
  );
}

export default Home;
