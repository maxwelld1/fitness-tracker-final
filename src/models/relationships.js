import { api, Globals } from './api';

export async function SendRequest(data) {
  const x = await api('relationships/sendRequest', data);
  return x;
}
export async function GetPendingRequests() {
  const x = await api(`relationships/getPending/${Globals.user.id}`);
  return x;
}
export async function ConfirmRequest(frID) {
  const x = await api(`relationships/confirm/${frID}`);
  return x;
}
export async function DeleteRequest(frID) {
  const x = await api(`relationships/delete/${frID}`);
  return x;
}
