import { IEntity } from "./_entity.interface";

export interface IUserPhone extends IEntity {
    user_id: number;
    value: string;
    pos: number;
}
