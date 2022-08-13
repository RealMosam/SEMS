
import { sport } from "./sport.model";
export class event {
  constructor(
    public eventDate: Date,
    public eventName: string,
    public noOfSlots: number,
    public sportName:string,
  ) { }
}
