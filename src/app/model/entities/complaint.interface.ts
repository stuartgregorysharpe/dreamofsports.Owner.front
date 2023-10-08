import { IEntity } from "./_entity.interface";
import { IUser } from "./user.interface";

export interface IComplaint extends IEntity {
    readonly author_id: number; // жалобщик
    readonly breaker_id: number; // нарушитель
    readonly content: string;
    readonly created_at: string;
    // relations
    readonly author: IUser;
    readonly breaker: IUser;    
}
