import { EnumType } from "typescript";

export class participation {
  constructor(
    public participationId: number,
    public playerId: number,
    public playerName: string,
    public eventId: number,
    public eventName: string,
    public sportsId: number,
    public sportsName: string,
    public status: number
  ) { }
}
