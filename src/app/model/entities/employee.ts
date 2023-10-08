import { CTranslatableEntity } from "./_translatable.entity";
import { IEmployeeTranslation } from "./employee.interface";
import { CLang } from "./lang";

export class CEmployee extends CTranslatableEntity<IEmployeeTranslation> {
    public img: string | File;
    public pos: number;
    public active: boolean;
    // relations
    public translations: IEmployeeTranslation[];

    public init(ll: CLang[]): CEmployee {
        this.pos = 0;
        this.active = true;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", post: ""}));                 
        return this;
    }
}
