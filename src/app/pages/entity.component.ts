import { Input, Directive, OnInit } from '@angular/core';
import { CEntity } from 'src/app/model/entities/_entity';
import { CLang } from 'src/app/model/entities/lang';
import { IThelang } from 'src/app/model/entities/thelang';
import { IKeyValue } from 'src/app/model/keyvalue.interface';
import { CAppService } from '../common/services/app.service';

@Directive()
export abstract class CEntityComponent<T extends CEntity> implements OnInit {    
    @Input() x: T;
    @Input() requiredFields: string[] = []; 
    @Input() ll: CLang[] = [];    
    @Input() errors: IKeyValue<boolean> = {}; 
    public selectedLang: CLang = null;    
    public tab: number = 1; 

    constructor(protected appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}   
    
    public ngOnInit(): void {
        if (this.ll?.length) {
            this.selectedLang = this.ll[0];
        }
    }

    public isRequired(field: string): boolean {
        return this.requiredFields.includes(field);
    }

    public toggleBlock(id: string): void {
        const e = document.getElementById(id);
        e.style.maxHeight = e.offsetHeight ? "0" : e.scrollHeight + "px";
    }

    /////////////////////
    // external editor
    /////////////////////

    public eeActive: boolean = false;
    public eeData: string = "";
    public eeEditableObject: Object = null;
    public eeEditableField: string = null; 
    
    public eeBind(obj, field): void {
        this.eeEditableObject = obj;
        this.eeEditableField = field;
        this.eeData = obj[field];     
        this.eeActive = true;
    }

    public eeApply(event: string): void {
        this.eeEditableObject[this.eeEditableField] = event;
    }

    ////////////////////
    // utils
    ////////////////////

    public removeNonDigits(param: string): void {
        if (this.x[param]?.length) {
            this.x[param] = this.x[param].replace(/\D/g,'');
        }
    }
}
