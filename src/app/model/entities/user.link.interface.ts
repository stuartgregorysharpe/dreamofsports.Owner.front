import { IEntity } from "./_entity.interface";

export interface IUserLink extends IEntity {
    user_id: number;
    value: string;
    pos: number;
}
