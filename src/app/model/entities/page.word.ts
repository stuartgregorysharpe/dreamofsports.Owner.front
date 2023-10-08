import { CTranslatableEntity } from "./_translatable.entity";
import { CLang } from "./lang";

export class CPageWord extends CTranslatableEntity<IPageWordTranslation> {
    public page_id: number;
    public pos: number;
    public mark: string;
    public note: string;
    // relations
    public translations: IPageWordTranslation[];

    public init(pos: number, ll: CLang[]): CPageWord {
        this.pos = pos;
        this.translations = ll.map(l => ({lang_id: l.id, text: ""}));        
        return this;
    }
}

export interface IPageWord {
    page_id: number;
    pos: number;
    mark: string;
    note: string;
    // relations
    translations: IPageWordTranslation[];
}

export interface IPageWordTranslation {
    id?: number;
    word_id?: number;
    lang_id: number;
    text: string;
}
