export interface User {
  id: number;
  vorname: string;
  nachname: string;
  typ: UserType;
}

export enum UserType {
  Mitglied,
  Gast,
}
