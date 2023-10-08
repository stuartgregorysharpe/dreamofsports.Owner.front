import { IEntity } from "./_entity.interface";

export interface IEmployee extends IEntity {
    img: string;
    pos: number;
    active: boolean;
    // relations
    translations: IEmployeeTranslation[];
}

export interface IEmployeeTranslation {
    id?: number;
    employee_id?: number;
    lang_id: number;
    name: string;
    post: string;
}
