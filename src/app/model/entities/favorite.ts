import { CEntity } from "./_entity";
import { IFavorite } from "./favorite.interface";
import { CUser } from "./user";

export class CFavorite extends CEntity {
    public user_id: number;
    public favorite_id: number;
    public created_at: Date;
    // relations
    public user: CUser;
    public favorite: CUser;

    public build (o: IFavorite): CFavorite {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else if (field === "user") {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else if (field === "favorite") {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }  

    public init(): CFavorite {
        this.user_id = null;
        this.favorite_id = null;        
        return this;
    }
}
