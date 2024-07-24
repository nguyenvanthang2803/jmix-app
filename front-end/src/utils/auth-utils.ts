import {JwtPayload, jwtDecode} from 'jwt-decode';
export const encodeFormData = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};
export const decodeToken = (token: any) => {
  const decode = jwtDecode(token, {payload: true});
  return decode.preferred_username;
};
export function getFormattedDate(date: Date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return year + '-' + month + '-' + day;
}
