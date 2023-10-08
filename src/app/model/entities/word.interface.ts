import { IEntity } from "./_entity.interface";

export interface IWord extends IEntity {
    mark: string;
    note: string;
    pos?: number;    
    // relations
    translations?: IWordTranslation[];
}

export interface IWordTranslation {
    id?: number;
    word_id?: number;
    lang_id: number;
    text: string;
}
