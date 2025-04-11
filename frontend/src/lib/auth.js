// src/utils/auth.js
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const getShopkeeperFromToken = () => {
  const token = Cookies.get("shopkeeperToken");
  if (!token) return null;

  return token;
};
