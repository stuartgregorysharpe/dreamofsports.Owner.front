import { CTranslatableEntity } from "./_translatable.entity";
import { TGender, IAthletTranslation } from "./athlet.interface";
import { CLang } from "./lang";
import { CReward } from "./reward";

export class CAthlet extends CTranslatableEntity<IAthletTranslation> {
    public user_id: number;
    public cat_id: number;
    public country_id: number;
    public img: string | File;
    public img_s: string;
    public birthdate: string;
    public gender: TGender;
    public height_meter: number;
    public height_foot: number;
    public weight_kg: number;
    public weight_pound: number;
    public no: string; 
    // relations
    public translations: IAthletTranslation[];
    public rewards: CReward[];

    public build (o: Object): CAthlet {
        for (let field in o) {
            if (field === "rewards") {
                this[field] = o[field] ? o[field].map(o => new CReward().build(o)) : [];
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }  

    public init(ll: CLang[]): CAthlet {
        this.cat_id = null;
        this.country_id = null;
        this.gender = "m";
        this.translations = ll.map(l => ({lang_id: l.id, firstname: "", lastname: "", region: "", city: "", bio: "", team: "", role: "", rewards: ""})); 
        this.rewards = [];
        return this;
    }
}
