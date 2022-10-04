import axios from "axios";
import { getSession } from "next-auth/react";
import { getCookie } from "cookies-next";
const baseURL = process.env.BACKEND_URL;
let context = {};
const isServer = () => {
  return typeof window === "undefined";
};
export const setContext = (_context) => {
  context = _context;
};

export const instance = axios.create({ baseURL });
instance.interceptors.request.use(async (request) => {
  if (isServer() && context?.req?.cookies) {
    const session = await getSession(context);
    request.headers.Cookie = `token=${session.user.accessToken}`;
  }
  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(`error`, error)
  }
);
