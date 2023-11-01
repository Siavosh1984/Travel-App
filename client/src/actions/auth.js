import * as authService from '../services/authService';
import { AUTH, LOGOUT } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const user = await authService.signIn(formData);
    dispatch({ type: AUTH, data: user });
    navigate('/');
  } catch (error) {
    console.error(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const user = await authService.signUp(formData);
    dispatch({ type: AUTH, data: user });
    navigate('/');
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

