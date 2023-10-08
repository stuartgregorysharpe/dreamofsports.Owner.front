import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "check-box",
    templateUrl: "check-box.component.html",
    styleUrls: ["check-box.component.scss"],
})
export class CCheckBoxComponent {
    @Input() value: boolean;
    @Input() title: string = "";
    @Input() disabled: boolean = false;
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter();

    public onClick(): void {
        this.valueChange.emit(!this.value);
    }
}