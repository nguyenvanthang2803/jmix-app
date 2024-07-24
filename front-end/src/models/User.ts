export interface User {
  email: String;
  firstName: String;
  id: String;
  lastName: String;
  username: String;
}
export function filterUserFields(data: any): User {
  const {email, firstName, id, lastName, username} = data;
  return {email, firstName, id, lastName, username};
}

export type EntityOperationType = 'create' | 'read' | 'update' | 'delete';
