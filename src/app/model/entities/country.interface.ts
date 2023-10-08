import { IEntity } from "./_entity.interface";

export interface ICountry extends IEntity {
    code: string;
    // relations
    translations: ICountryTranslation[];
}

export interface ICountryTranslation {
    id?: number;
    country_id?: number;
    lang_id: number;
    name: string;
}
