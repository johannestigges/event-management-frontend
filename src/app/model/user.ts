export interface User {
  id: number;
  version: number;
  vorname: string;
  nachname: string;
  status: UserStatus;
  instrument?: Instrument;
  username?: string;
  password?: string;
  role?: UserRole;
}

export enum UserStatus {
  Mitglied,
  Gast
}

export enum UserRole {
    Gast,
    Nutzer,
    Satzfuehrer,
    Administrator
}

export interface Instrument {
  id: number;
  instrument: string;
  gruppe: string;
}
