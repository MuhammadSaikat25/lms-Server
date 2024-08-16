export interface TUser {
  name: string;
  email: string;
  password: string;
  avatar?: string
  role: string;
  courses: Array<string>;
}
