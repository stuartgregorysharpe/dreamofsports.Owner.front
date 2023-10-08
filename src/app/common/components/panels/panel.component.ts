import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { IThelang } from "src/app/model/entities/thelang";
import { CAppService } from "../../services/app.service";

@Directive()
export abstract class PanelComponent {
    @Input() public active: boolean;
    @Output() protected activeChange: EventEmitter<boolean> = new EventEmitter();

    constructor(protected appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}

    public onClose(): void {
        this.activeChange.emit(false);
    }
}