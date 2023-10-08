import { IEntity } from "./_entity.interface";
import { IUser } from "./user.interface";

export interface IBan extends IEntity {
    user_id: number;
    banned_id: number;
    created_at: string;
    // relations
    user: IUser;
    banned: IUser;
}
