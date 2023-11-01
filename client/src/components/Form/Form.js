import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) setFormData(post);
  }, [post]);

  const clearForm = () => {
    setCurrentId(0);
    setFormData({
      title: "",
      content: "",
      tags: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.result?.name) {
      navigate("/auth");
      return;
    }

    if (currentId === 0) {
      dispatch(createPost({ ...formData, name: user?.result?.name }));
      clearForm();
    } else {
      dispatch(updatePost(currentId, { ...formData, name: user?.result?.name }));
    }
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setFormData({ ...formData, content: e.target.value });
  };

  const handleTagsChange = (e) => {
    setFormData({ ...formData, tags: e.target.value.split(",") });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Edit" : "Create"} a Travel Post
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={handleTitleChange}
        />
        <TextField
          name="content"
          variant="outlined"
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={formData.content}
          onChange={handleContentChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma-separated)"
          fullWidth
          value={formData.tags}
          onChange={handleTagsChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          startIcon={<CloudUploadIcon />}
        >
          {currentId ? "Update" : "Create"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={clearForm}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
