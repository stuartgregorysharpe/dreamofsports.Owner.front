import { IEntity } from "./_entity.interface";

export interface ISetting extends IEntity {
    p: string;
    v: string;
    c: string;
    pos: number;
    load_to: string;
}