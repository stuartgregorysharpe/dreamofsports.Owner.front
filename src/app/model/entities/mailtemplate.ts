import { CLang } from "./lang";
import { CTranslatableEntity } from "./_translatable.entity";
import { IMailtemplateTranslation } from "./mailtemplate.interface";

export class CMailtemplate extends CTranslatableEntity<IMailtemplateTranslation> {
    public name: string;
    // relations
    public translations?: IMailtemplateTranslation[];
    
    public init(ll: CLang[]): CMailtemplate {
        this.translations = ll.map(l => ({lang_id: l.id, subject: "", content: ""}));                 
        return this;
    }
}
