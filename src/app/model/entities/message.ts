import { CEntity } from "./_entity";

export class CMessage extends CEntity {
    public name: string;
    public email: string;
    public content: string;
    public created_at: Date;

    public build (o: Object): CMessage {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }   
}
