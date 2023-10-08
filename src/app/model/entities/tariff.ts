import { CTranslatableEntity } from "./_translatable.entity";
import { CLang } from "./lang";
import { ITariffTranslation } from "./tariff.interface";

export class CTariff extends CTranslatableEntity<ITariffTranslation> {
    public price: number;
    public duration: number;
    public np_compatible: boolean;
    public apple_pid: string;
    public google_pid: string;
    public active: boolean;
    // relations
    public translations: ITariffTranslation[];

    public init(ll: CLang[]): CTariff {
        this.price = 1;
        this.duration = 1;
        this.np_compatible = true;
        this.active = true;
        this.translations = ll.map(l => ({lang_id: l.id, name: ""}));                 
        return this;
    }
}
