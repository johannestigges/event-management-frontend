import { Participant } from './participant';

export interface Event {
  id: number;
  version: number;
  name: string;
  startAt?: Date;
  endAt?: Date;
  participants?: Participant[];
}
