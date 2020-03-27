import { Dice } from "./Dice";

export class User{
    public Id: number | undefined;
    public Name: string | undefined;
    public Chips: number | undefined;
    public Passive: boolean | undefined;
    public Visible: boolean | undefined;
    public Dices: Dice[] | undefined;
}