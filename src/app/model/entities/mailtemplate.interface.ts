import { IEntity } from "./_entity.interface";

export interface IMailtemplate extends IEntity {
    name: string;
    // relations
    translations?: IMailtemplateTranslation[];
}

export interface IMailtemplateTranslation {
    id?: number;
    mailtemplate_id?: number;
    lang_id: number;
    subject: string;
    content: string;
}
