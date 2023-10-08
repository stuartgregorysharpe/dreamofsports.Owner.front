import { CTranslatableEntity } from "./_translatable.entity";
import { ICountryTranslation } from "./country.interface";
import { CLang } from "./lang";

export class CCountry extends CTranslatableEntity<ICountryTranslation> {
    public code: string;
    // relations
    public translations: ICountryTranslation[];

    public init(ll: CLang[]): CCountry {
        this.translations = ll.map(l => ({lang_id: l.id, name: ""}));                 
        return this;
    }
}
