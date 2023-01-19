import { Participant } from './participant';

export interface Event {
  id: number;
  version: number;
  name: string;
  start?: Date;
  end?: Date;
  participants?: Participant[];
}
