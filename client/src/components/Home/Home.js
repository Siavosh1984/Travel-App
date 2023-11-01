import React, { useState, useEffect } from 'react';
import { Container, Grid, AppBar, TextField, Button, Paper } from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch, getPosts } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';


const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      if (search.trim() || tags.length > 0) {
        await dispatch(getPostsBySearch({ search, tags }));
      } else {
        await dispatch(getPosts());
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPosts();
  };

 

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <Posts setCurrentId={setCurrentId} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <AppBar position="static" color="inherit" className={classes.appBarSearch}>
              <TextField
                name="search"
                variant="outlined"
                label="Search Travels"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              
              <Button
                onClick={handleSearch}
                className={classes.searchButton}
                variant="contained"
                color="primary"
                fullWidth
              >
                Search
              </Button>
            </AppBar>
          </Paper>
          <Paper elevation={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Paper>
          {(!search && tags.length === 0) && (
            <Paper elevation={6} className={classes.pagination}>
              <Pagination />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
