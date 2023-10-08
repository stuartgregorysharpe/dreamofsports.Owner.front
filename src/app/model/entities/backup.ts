import { CEntity } from "./_entity";
import { TBackupType } from "./backup.interface";

export class CBackup extends CEntity {
    public filename: string;
    public type: TBackupType;
    public ready: boolean;
    public created_at: Date;

    public build (o: Object): CBackup {
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
