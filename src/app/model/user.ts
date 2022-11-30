export interface User {
  id: number;
  vorname: string;
  nachname: string;
  status: UserStatus;
  instrument?: Instrument;
}

export enum UserStatus {
  Mitglied,
  Gast,
}

export interface Instrument {
  id: number;
  instrument: string;
  gruppe: string;
}
