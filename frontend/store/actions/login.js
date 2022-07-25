import {
  LOGIN_USER,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../types";
import {
    parseCookies
} from "nookies";
const cookies = parseCookies();

console.log("COOKIE: " , {cookies})
import axios from "axios";

export const isLoggedIn = (isLoggedIn) => ({
  type: LOGIN_USER,
  payload: isLoggedIn,
});
// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load user
export const loadUser = (token) => async (dispatch) => {
  console.log("LOAD USER++++++++++++++", token);
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    var config = {
        method: "get",
        url: "http://localhost:4000/api/v1/me",
        headers: {
          Cookie: `token=${token}`,
        },
      };
    const { data } = await axios(config);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
        type: LOAD_USER_FAIL,
        payload: error.message,
    });
  }
};
