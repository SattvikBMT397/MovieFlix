import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { removeFavorite, setFavorites, saveFavoritesToLocalForage } from '../features/favorites/favoritesSlice';
import localforage from 'localforage';


function Favorites() {
  const favorites = useSelector(state => state.favorites.favorites);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      // console.log(currentUser);
      if (currentUser) {
        const data = await localforage.getItem(`favorites_${currentUser.username}`);
        console.log(data);  
        if (data) {
          dispatch(setFavorites(data));
        }
      }
    };
    fetchFavorites();
  }, [currentUser, dispatch]);

  const handleRemoveFavorite = (movie) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    dispatch(removeFavorite(movie));
    if (currentUser) {
      dispatch(saveFavoritesToLocalForage(currentUser.username, updatedFavorites));
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        My Favorite Movies
      </Typography>
      <Grid container spacing={3}>
        {favorites && favorites.length > 0 ? (
          favorites.map((movie, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={3} style={{ display: 'flex', flexDirection: 'row', minHeight: '250px' }}>
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
                        maxHeight: 700,
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
                      <Button variant="contained" style={{ marginTop: '20px', backgroundColor: 'red' }} onClick={() => handleRemoveFavorite(movie)}>
                        Remove from Favorites
                      </Button>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant='h6' color="textSecondary" align='center' sx={{ margin: '30px' }}>
            No favorite movies found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Favorites;
