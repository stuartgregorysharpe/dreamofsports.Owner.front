import { CEntity } from "./_entity";
import { IBan } from "./ban.interface";
import { CUser } from "./user";

export class CBan extends CEntity {
    public user_id: number;
    public banned_id: number;
    public created_at: Date;
    // relations
    public user: CUser;
    public banned: CUser;

    public build (o: IBan): CBan {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else if (field === "user") {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else if (field === "banned") {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }  

    public init(): CBan {
        this.user_id = null;
        this.banned_id = null;        
        return this;
    }
}
