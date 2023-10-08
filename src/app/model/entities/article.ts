import { CTranslatableEntity } from "./_translatable.entity";
import { CArticleCat } from "./article.cat";
import { IArticleTranslation } from "./article.interface";
import { CLang } from "./lang";

export class CArticle extends CTranslatableEntity<IArticleTranslation> {
    public cat_id: number;
    public slug: string;
    public date: Date;
    public img: string | File;
    public img_s: string;
    public active: boolean;
    public in_gal: boolean;
    // relations
    public translations: IArticleTranslation[];
    public cat?: CArticleCat;

    public build (o: Object): CArticle {
        for (let field in o) {
            if (field === "date") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else if (field === "cat") {
                this[field] = o[field] ? new CArticleCat().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }   

    public init(ll: CLang[]): CArticle {
        this.cat_id = null;
        this.date = new Date();
        this.active = true;
        this.in_gal = false;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", content: "", contentshort: "",  title: "", description: "", h1: ""})); 
        return this;
    }
}
