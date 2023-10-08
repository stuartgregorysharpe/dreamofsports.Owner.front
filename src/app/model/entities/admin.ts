import { CEntity } from './_entity';
import { CAdminGroup } from './admin.group';

export class CAdmin extends CEntity {        
    public group_id: number;
    public name: string;
    public email: string;
    public password: string;
    public img: string | File;    
    public active: boolean;    
    // relations 
    public group?: CAdminGroup;
    
    public init(): CAdmin {
        this.group_id = 1;
        this.active = true;     
        return this;
    }
}
