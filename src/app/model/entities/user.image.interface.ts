import { IEntity } from "./_entity.interface";

export interface IUserImage extends IEntity {
    user_id: number;
    url: string;
    pos: number;
}   
