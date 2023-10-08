import { Directive, Input } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CLang } from "src/app/model/entities/lang";
import { IThelang } from "src/app/model/entities/thelang";
import { CUser } from "src/app/model/entities/user";
import { IKeyValue } from "src/app/model/keyvalue.interface";

@Directive()
export abstract class CResumeComponent {
    @Input() public x: CUser;
    @Input() public requiredFields: string[] = []; 
    @Input() public errors: IKeyValue<boolean> = {}; 
    @Input() public selectedLang: CLang = null;    

    constructor(protected appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}   
        
    public isRequired(field: string): boolean {
        return this.requiredFields.includes(field);
    }
}