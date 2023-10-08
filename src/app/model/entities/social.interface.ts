import { IEntity } from "./_entity.interface";

export interface ISocial extends IEntity {
    name: string;
    url: string;
    img: string;
}
