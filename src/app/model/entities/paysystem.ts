import { CTranslatableEntity } from "./_translatable.entity";
import { CLang } from "./lang";
import { IPaysystemParam, IPaysystemTranslation } from "./paysystem.interface";

export class CPaysystem extends CTranslatableEntity<IPaysystemTranslation> {
    public name: string;
    public pos: number;
    public active: boolean;
    // relations
    public translations: IPaysystemTranslation[];
    public params: IPaysystemParam[];

    public init(ll: CLang[]): CPaysystem {
        this.pos = 0;
        this.active = true;
        this.translations = ll.map(l => ({lang_id: l.id, title: ""}));                 
        this.params = [];
        return this;
    }
}
