import { AUTH, LOGOUT } from '../constants/actionTypes';

const initialState = {
  user: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('user', JSON.stringify(action?.data));
      return { ...state, user: action?.data, isAuth: true };

    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null, isAuth: false };

    default:
      return state;
  }
};

export default authReducer;
