import {
  SET_CURRENT_USER,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";

export const userLoginReducer = (
  state = { isAuthenticated: false, user: {} },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case SET_CURRENT_USER:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        user: {},
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
export const userRegisterReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
