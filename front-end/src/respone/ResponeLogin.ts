export interface ResponeLogin {
  status?: number | null;
  accessToken?: string | null;
  refreshToken?: String | null;
}
export const defaultValue: Readonly<ResponeLogin> = {};
