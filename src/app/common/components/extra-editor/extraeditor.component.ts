import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { cfg } from "src/app/app.config";
import { IThelang } from "src/app/model/entities/thelang";
import { TDir } from "src/app/model/entities/lang.interface";

@Component({
    selector: "extra-editor",
    templateUrl: "extraeditor.component.html",
    styleUrls: [
        "extraeditor.component.scss",
        "../../styles/wins.scss",
    ],    
})
export class CExtraEditorComponent implements OnInit, OnChanges {
    @Input() data: string = "";
    @Output() dataChange: EventEmitter<string> = new EventEmitter();
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    @Input() public dir: TDir = "ltr";
    public copy: string = "";
    public unique: number = 0;
    
    constructor(private appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}
    get editorCfgLtr(): any {return cfg.editorCfg;}
    get editorCfgRtl(): any {
        const config: any = {...cfg.editorCfg};
        config.directionality = "rtl";
        return config;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["active"]?.currentValue) {
            this.copy = this.data;
        }
    }

    public ngOnInit(): void {
        this.unique = this.appService.rndId();
    }
    
    public onClose(): void {
        this.activeChange.emit(false);
    }

    public onApply(): void {
        this.dataChange.emit(this.copy);
        this.onClose();
    }    

    public onClick(event: PointerEvent): void {        
        if (this.active && !this.appService.pathHasIds(event.composedPath() as HTMLElement[], [`win-${this.unique}`])) {
            this.onClose();
        }
    }  
}