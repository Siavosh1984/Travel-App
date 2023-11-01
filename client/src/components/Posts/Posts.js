
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography, Card, CardContent } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts || posts.length === 0) {
    return (
      <Grid container justify="center">
        <Card className={classes.noPostsCard}>
          <CardContent>
            <Typography variant="h6" align="center">
              No posts found. Be the first to create one!
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
