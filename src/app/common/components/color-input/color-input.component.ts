import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "color-input",
    templateUrl: "color-input.component.html",
})
export class CColorInputComponent {
    @Input() value: string;
    @Output() valueChange: EventEmitter<string> = new EventEmitter();
    public pickerActive: boolean = false;

    constructor(protected appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}  

    public onValueChange(value: string): void {
        this.valueChange.emit(value);
    }
}