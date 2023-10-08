import { CLang } from "./lang";
import { CTranslatableEntity } from "./_translatable.entity";
import { IWordTranslation } from "./word.interface";

export class CWord extends CTranslatableEntity<IWordTranslation> {    
    public mark: string;
    public note: string;
    public pos?: number;    
    // relations
    public translations?: IWordTranslation[];

    public init(pos: number, ll: CLang[]): CWord {
        this.pos = pos;
        this.translations = ll.map(l => ({lang_id: l.id, text: ""}));        
        return this;
    }
}
