import { IEntity } from "./_entity.interface";

export interface IPaysystem extends IEntity {
    name: string;
    pos: number;
    active: boolean;
    // relations
    translations: IPaysystemTranslation[];
    params: IPaysystemParam[];
}

export interface IPaysystemTranslation {
    id?: number;
    paysystem_id?: number;
    lang_id: number;
    title: string;   
}

export interface IPaysystemParam extends IEntity {
    paysystem_id?: number;
    name: string;
    value: string;
    loadable: boolean;
}
