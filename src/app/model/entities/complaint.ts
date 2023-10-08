import { CEntity } from "./_entity";
import { IComplaint } from "./complaint.interface";
import { CUser } from "./user";

export class CComplaint extends CEntity {
    public author_id: number; // жалобщик
    public breaker_id: number; // нарушитель
    public content: string;
    public created_at: Date;
    // relations
    public author: CUser;
    public breaker: CUser;

    public build (o: IComplaint): CComplaint {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else if (field === "author") {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else if (field === "breaker") {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }  
}