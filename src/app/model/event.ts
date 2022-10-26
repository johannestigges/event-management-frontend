import { Participant } from './participant';

export interface Event {
  id: number;
  name: string;
  start?: Date;
  end?: Date;
  participants?: Participant[];
}
