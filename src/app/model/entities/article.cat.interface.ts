import { IEntity } from "./_entity.interface";

export interface IArticleCat extends IEntity {
    slug: string;
    pos: number;
    active: boolean;
    // relations
    translations: IArticleCatTranslation[];
}

export interface IArticleCatTranslation {
    id?: number;
    cat_id?: number;
    lang_id: number;
    name: string;
    title: string;
    description: string;
    h1: string;
}
