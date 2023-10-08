import { CTranslatableEntity } from "./_translatable.entity";
import { ICatTranslation } from "./cat.interface";
import { CLang } from "./lang";

export class CCat extends CTranslatableEntity<ICatTranslation> {
    public parent_id: number;
    public slug: string;
    public pos: number;
    public menufoot: boolean;
    // relations
    public translations: ICatTranslation[];
    public children?: CCat[];
    public parent?: CCat;

    public init(ll: CLang[]): CCat {
        this.parent_id = null;
        this.pos = 0;
        this.menufoot = false;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", title: "", description: "", h1: ""})); 
        return this;
    }
}
