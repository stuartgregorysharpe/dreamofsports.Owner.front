import { CEntity } from "./_entity";
import { IPayment } from "./payment.interface";

export class CPayment extends CEntity {
    public outer_id: string;
    public user_email: string;
    public paysystem: string;
    public amount: number;
    public duration: number;
    public completed: boolean;
    public created_at: Date;    

    public build (o: IPayment): CPayment {
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
