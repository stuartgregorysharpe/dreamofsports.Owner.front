import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "color-picker",
    templateUrl: "color-picker.component.html",
    styleUrls: [
        "color-picker.component.scss",
        "../../styles/wins.scss",
    ], 
    encapsulation: ViewEncapsulation.None,   
})
export class CColorPickerComponent implements OnInit {
    @Input() value: string = "";
    @Output() valueChange: EventEmitter<string> = new EventEmitter();
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    
    public unique: number = 0;
    
    constructor(private appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}

    public ngOnInit(): void {
        this.unique = this.appService.rndId();
    }
    
    public onClose(): void {
        this.activeChange.emit(false);
    }

    public onApply(): void {
        this.valueChange.emit(this.value);
        this.onClose();
    }    

    public onClick(event: PointerEvent): void {        
        if (this.active && !this.appService.pathHasIds(event.composedPath() as HTMLElement[], [`win-${this.unique}`])) {
            this.onClose();
        }
    }  

    public onColorChange(value: string): void {
        this.value = value;
    }
}
