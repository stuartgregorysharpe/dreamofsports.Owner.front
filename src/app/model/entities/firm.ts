import { CTranslatableEntity } from "./_translatable.entity";
import { IFirmTranslation } from "./firm.interface";
import { CLang } from "./lang";

export class CFirm extends CTranslatableEntity<IFirmTranslation> {
    public user_id: number;
    public img: string | File;
    public img_s: string;
    public reg_no: string;
    public reg_date: string;
    public reg_country_id: number;
    public fact_country_id: number;
    // relations
    public translations: IFirmTranslation[];

    public init(ll: CLang[]): CFirm {
        this.reg_country_id = null;
        this.fact_country_id = null;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", branch: "", founder: "", reg_addr: "", fact_addr: "", about: ""})); 
        return this;
    }
}