import { IEntity } from "./_entity.interface";

export interface IUserVideo extends IEntity {
    user_id: number;
    url: string;
    pos: number;
}   
