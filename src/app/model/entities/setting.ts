import { CEntity } from './_entity';

export class CSetting extends CEntity {    
    public p: string;
    public v: string;
    public c: string;
    public pos: number;
    public load_to: string;

    public init(): CSetting {
        this.pos = 0;
        this.load_to = "all";        
        return this;
    }
}
