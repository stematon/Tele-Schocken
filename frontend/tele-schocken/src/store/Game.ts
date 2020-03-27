import { User } from "./User";

export class Game{
    public Gid: number | undefined;
    public Stack: number | undefined;
    public State: string | undefined;
    public First_Half: boolean | undefined;
    public Move: number | undefined;
    public First: number | undefined;
    public Admin: number | undefined;
    public Users: User[] | undefined;
}