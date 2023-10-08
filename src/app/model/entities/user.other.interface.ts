import { IEntity } from "./_entity.interface";

export interface IUserOther extends IEntity {
    user_id: number;
    name: string;
    url: string;
    pos: number;
}   
