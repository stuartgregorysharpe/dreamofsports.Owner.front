import { IEntity } from "./_entity.interface";

export interface IPayment extends IEntity {
    outer_id: string;
    user_email: string;
    paysystem: string;
    amount: number;
    duration: number;
    completed: boolean;
    created_at: string;    
}
