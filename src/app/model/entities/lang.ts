import { CEntity } from './_entity';
import { TDateFormat, TDir } from './lang.interface';

export class CLang extends CEntity {    
    public slug: string;    
    public title: string;
    public shorttitle: string;
    public img: string | File;    
    public slugable: boolean;
    public dir: TDir; 
    public dateformat: TDateFormat;
    public pos: number;
    public active: boolean;

    public init(): CLang {        
        this.slugable = false;  
        this.dir = "ltr";  
        this.dateformat = "en";
        this.pos = 0;
        this.active = true;        
        return this;
    }    
}
