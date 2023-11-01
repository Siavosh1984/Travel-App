import * as api from '../api/posts';
import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes';

export const fetchAllPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchAllPosts(page);
    dispatch({ type: FETCH_POSTS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error("Error fetching all posts:", error);
  }
};

export const fetchSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSinglePost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error("Error fetching single post:", error);
  }
};

export const searchPosts = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.searchPosts(searchQuery);
    dispatch({ type: FETCH_POSTS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error("Error searching posts:", error);
  }
};

export const createNewPost = (newPost, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createNewPost(newPost);
    dispatch({ type: CREATE_POST, payload: data });
    navigate(`/posts/${data._id}`);
  } catch (error) {
    console.error("Error creating a new post:", error);
  }
};

export const updateExistingPost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updateExistingPost(id, updatedPost);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.error("Error updating an existing post:", error);
  }
};

export const removePost = (id) => async (dispatch) => {
  try {
    await api.removePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.error("Error removing a post:", error);
  }
};

export const likeExistingPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeExistingPost(id);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.error("Error liking an existing post:", error);
  }
};
