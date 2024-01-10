import { getCookie, setCookie, removeCookies } from "cookies-next";

export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookies = (name) => {
  return cookies.remove(name);
};
