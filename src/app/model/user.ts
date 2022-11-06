export interface User {
  id: number;
  vorname: string;
  nachname: string;
  status: UserStatus;
}

export enum UserStatus {
  Mitglied,
  Gast,
}
