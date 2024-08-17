export interface UserProfileResponse {
  name: string;
  email: string;
  role: 'manager' | 'user';
}
