import axios from "axios";
import { getToken } from "./getToken";

export const http = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    "Authorization": "Bearer " + getToken(),
  },
  withCredentials: true
  });