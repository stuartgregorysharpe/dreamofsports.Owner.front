import { CEntity } from "./_entity";

export class CUserPhone extends CEntity {
    public user_id: number;
    public value: string;
    public pos: number;

    public init(pos: number): CUserPhone {
        this.pos = pos;
        return this;
    }
}