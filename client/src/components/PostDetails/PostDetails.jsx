import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import { getPost, deletePost } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    navigate('/');
  };

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper elevation={6} className={classes.paper}>
      {post ? (
        <div>
          <div className={classes.card}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2" className={classes.title}>
                {post.title}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h2" className={classes.tags}>
                {post.tags.map((tag) => (
                  <Link to={`/tags/${tag}`} key={tag} className={classes.tag}>
                    {`#${tag}`}
                  </Link>
                ))}
              </Typography>
              <Typography variant="body1" component="p" className={classes.message}>
                {post.message}
              </Typography>
              <Typography variant="h6" className={classes.creator}>
                Created by:
                <Link to={`/creators/${post.name}`} className={classes.creatorLink}>
                  {` ${post.name}`}
                </Link>
              </Typography>
              <Typography variant="body1" className={classes.createdAt}>
                {moment(post.createdAt).fromNow()}
              </Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="body1" className={classes.chat}>
                <strong>Realtime Chat - coming soon!</strong>
              </Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Button variant="contained" color="secondary" onClick={handleDelete} className={classes.deleteButton}>
                Delete Post
              </Button>
            </div>
            <div className={classes.imageSection}>
              <img src={post.selectedFile || 'https://source.unsplash.com/random'} alt={post.title} className={classes.media} />
            </div>
          </div>
        </div>
      ) : null}
    </Paper>
  );
};

export default PostDetails;

