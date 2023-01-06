import http from "./httpService";

const apiEndPoint = "/api/auth";

http.setJwt(getJwt());

export async function login(matricule, password) {
  const { data: jwt } = await http.post(apiEndPoint, { matricule, password });
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getJwt() {
  return localStorage.getItem("token");
}
