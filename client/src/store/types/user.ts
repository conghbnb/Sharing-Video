export interface IUser {
  _id: string;
  email: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}
