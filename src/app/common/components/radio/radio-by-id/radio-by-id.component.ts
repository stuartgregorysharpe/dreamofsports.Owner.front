import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CEntity } from "src/app/model/entities/_entity";

@Component({
    selector: "radio-by-id",
    templateUrl: "radio-by-id.component.html",
    styleUrls: ["../../../styles/radio.scss"],
})
export class CRadioByIdComponent {
    @Input() items: CEntity[];
    @Input() visibleField: string;
    @Input() value: CEntity;
    @Input() flex: boolean = true;
    @Input() title: string = null;
    @Output() valueChange: EventEmitter<number> = new EventEmitter();

    public onSelect(item: CEntity): void {
        this.valueChange.emit(item.id);
    }
}