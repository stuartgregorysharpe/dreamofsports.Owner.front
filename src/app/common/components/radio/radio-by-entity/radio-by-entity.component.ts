import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CEntity } from "src/app/model/entities/_entity";

@Component({
    selector: "radio-by-entity",
    templateUrl: "radio-by-entity.component.html",
    styleUrls: ["../../../styles/radio.scss"],
})
export class CRadioByEntityComponent {
    @Input() items: CEntity[];
    @Input() visibleField: string;
    @Input() value: CEntity;
    @Input() title: string = null;
    @Input() flex: boolean = true;
    @Output() valueChange: EventEmitter<CEntity> = new EventEmitter();

    public onSelect(item: CEntity): void {
        this.valueChange.emit(item);
    }
}