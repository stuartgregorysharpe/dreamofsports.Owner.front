import { IEntity } from "./_entity.interface";

export interface IUserEmail extends IEntity {
    user_id: number;
    value: string;
    pos: number;
}
