//P => Process Id | Step Id
//S => Don't use it.
//C => Customer
//T => Tenant
//M => menu
//D => menu document ID
//U => User
//O => Org
export interface Token {
  [key: string]: string;
  D: string;
  P: string;
  S: string;
  C: string;
  U: string;
  T: string;
  O: string;
}
