import { IChildable } from "../childable.interface";
import { CLang } from "./lang";
import { CTranslatableEntity } from "./_translatable.entity";
import { CPageWord } from "./page.word";
import { IPageTranslation } from "./page.interface";

export class CPage extends CTranslatableEntity<IPageTranslation> implements IChildable {
    public parent_id: number;
    public slug: string;
    public img: string | File;
    public pos: number;
    public active: boolean;
    public menumain: boolean;
    public menufoot: boolean;
    // relations
    public translations?: IPageTranslation[];
    public children?: CPage[];
    public words?: CPageWord[];

    public build (o: Object): CPage {
        for (let field in o) {
            if (field === "words") {
                this[field] = o[field] ? o[field].map(w => new CPageWord().build(w)) : [];
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }   

    public init(ll: CLang[]): CPage {
        this.parent_id = null;
        this.pos = 0;
        this.active = true;
        this.menumain = true;
        this.menufoot = true;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", content: "", title: "", description: "", h1: ""})); 
        this.words = [];                
        return this;
    }
}
