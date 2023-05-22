export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface ISignInPayload {
  email: string;
  password: string
}
