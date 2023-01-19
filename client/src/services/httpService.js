import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("Unexpected error occurred...");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
