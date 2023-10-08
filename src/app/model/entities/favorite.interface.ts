import { IEntity } from "./_entity.interface";
import { IUser } from "./user.interface";

export interface IFavorite extends IEntity {
    user_id: number;
    favorite_id: number;
    created_at: string;
    // relations
    user: IUser;
    favorite: IUser;
}
