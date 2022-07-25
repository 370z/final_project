import {
    LOGIN_USER,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
} from "../../types";
import {
    parseCookies
} from "nookies";
const cookies = parseCookies();

const initialState = {
    isLoggedIn:false,
    email: null,
    user_role_id : null
};

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload
        default:
            return state;
    }
};

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };

  
      case LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };

      default:
        return state;
    }
  };