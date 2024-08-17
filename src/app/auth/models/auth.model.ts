export interface Password {
  password: string;
}

export interface Credentials extends Password {
  email: string;
}

export interface Token {
  token: string;
}

export interface UserInfo {
  email: string;
  name: string;
}

export interface UserRole extends UserInfo {
  role: 'manager' | 'user';
}
