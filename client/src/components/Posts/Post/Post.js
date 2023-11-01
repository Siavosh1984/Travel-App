import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../actions/posts';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleLike = () => {
    dispatch(likePost(post._id));
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <Card className={classes.card}>
      <ButtonBase onClick={() => navigate(`/posts/${post._id}`)}>
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {user?.result?._id === post?.creator && (
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
              <DeleteOutlineIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
      </ButtonBase>
      <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
        <Likes post={post} user={user} />
      </Button>
      {user?.result?._id === post?.creator && (
        <Button size="small" color="secondary" onClick={handleDelete}>
          <DeleteOutlineIcon fontSize="small" /> Delete
        </Button>
      )}
    </Card>
  );
};

const Likes = ({ post, user }) => {
  if (post.likes.length > 0) {
    const isLiked = post.likes.find((like) => like === (user?.result?._id));
    const likeCount = post.likes.length;

    if (isLiked) {
      return (
        <div>
          <ThumbUpIcon fontSize="small" />
          {likeCount > 1 ? `${likeCount} Likes` : '1 Like'}
        </div>
      );
    } else {
      return (
        <div>
          <ThumbUpOutlinedIcon fontSize="small" />
          {`${likeCount} Likes`}
        </div>
      );
    }
  }
  return <div><ThumbUpOutlinedIcon fontSize="small" /> Like</div>;
};

export default Post;
