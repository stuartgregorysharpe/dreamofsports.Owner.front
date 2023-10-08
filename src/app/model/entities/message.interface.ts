import { IEntity } from "./_entity.interface";

export interface IMessage extends IEntity {
    name: string;
    email: string;
    content: string;
    created_at: string;
}
