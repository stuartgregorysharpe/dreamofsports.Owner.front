import { IEntity } from "./_entity.interface";

export interface IUserSocial extends IEntity {
    user_id: number;
    social_id: number;
    value: string;
    pos: number;
}
