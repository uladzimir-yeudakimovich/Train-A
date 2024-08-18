export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'manager ';
}
