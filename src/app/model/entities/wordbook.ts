import { CEntity } from "./_entity";
import { CWord } from "./word";

export class CWordbook extends CEntity {
    public name: string;
    public pos: number;
    public load_to: string;
    // relations
    public words?: CWord[];

    public build (o: Object): CWordbook {
        for (let field in o) {
            if (field === "words") {
                this[field] = o[field].map(w => new CWord().build(w));
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }    
    
    public init(): CWordbook {
        this.pos = 0;
        this.load_to = "all";
        this.words = [];
        return this;
    }
}
