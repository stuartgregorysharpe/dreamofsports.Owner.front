import { IEntity } from "./_entity.interface";
import { IAdminGroup } from "./admin.group.interface";

export interface IAdmin extends IEntity {
    group_id: number;
    name: string;
    email: string;
    password: string;
    img: string;    
    active: boolean;    
    // relations 
    group?: IAdminGroup;
}