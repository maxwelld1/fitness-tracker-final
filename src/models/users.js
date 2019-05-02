import { api, Globals } from './api';

export async function GetFriends() {
  const x = await api(`users/getfriends:${Globals.user.id}`);
  return x;
}

export async function GetUsers() {
  const x = await api('users');
  return x;
}

export const GetFriends2 = () => api('users');

export async function Register(data) {
  const x = await api('users', data);
  return x;
}
export async function Login(data) {
  const x = await api('users/login', data);
  Globals.user = x.user;
  Globals.token = x.token;
  return x;
}
export async function SendRequest(data) {
  const x = await api('relationships/sendRequest', data);
  return x;
}
export async function GetPendingRequests() {
  const x = await api(`relationships/getPending/${Globals.user.id}`);
  return x;
}
export async function ConfirmRequest(id) {
  const x = await api(`relationships/confirm:${id}`);
  return x;
}
export async function DeleteRequest(id) {
  const x = await api(`relationships/delete:${id}`);
  return x;
}
/* export async function oAuthLogin(token, fbid) {
  const x = await api('users/facebookLogin', { token });
  Globals.user = x.user;
  Globals.token = x.token;
  Globals.oAuthUser = x.oAuthUser;
  return x;
} */
