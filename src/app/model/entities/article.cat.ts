import { CTranslatableEntity } from "./_translatable.entity";
import { IArticleCatTranslation } from "./article.cat.interface";
import { CLang } from "./lang";

export class CArticleCat extends CTranslatableEntity<IArticleCatTranslation> {
    public slug: string;
    public pos: number;
    public active: boolean;
    // relations
    public translations: IArticleCatTranslation[];

    public init(ll: CLang[]): CArticleCat {
        this.pos = 0;
        this.active = true;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", title: "", description: "", h1: ""})); 
        return this;
    }
}
