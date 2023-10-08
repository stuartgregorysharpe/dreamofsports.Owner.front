import { IEntity } from "./_entity.interface";

export interface IFirm extends IEntity {
    user_id: number;
    img: string;
    img_s: string;
    reg_no: string;
    reg_date: string;
    reg_country_id: number;
    fact_country_id: number;
    // relations
    translations: IFirmTranslation[];
}

export interface IFirmTranslation {
    id?: number;
    lang_id: number;
    firm_id?: number;
    name: string;
    branch: string;
    founder: string;
    reg_addr: string;
    fact_addr: string;
    about: string;
}
