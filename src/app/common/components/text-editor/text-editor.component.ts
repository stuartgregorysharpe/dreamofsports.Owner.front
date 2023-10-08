import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { cfg } from "src/app/app.config";
import { IThelang } from "src/app/model/entities/thelang";
import { TDir } from "src/app/model/entities/lang.interface";

@Component({
    selector: "text-editor",
    templateUrl: "text-editor.component.html",
    styleUrls: [
        "text-editor.component.scss",
        "../../styles/radio.scss",
    ],
})
export class CTextEditor {
    @Input() public value: string;
    @Input() public dir: TDir = "ltr";
    @Input() public error: string = null;
    @Output() public valueChange: EventEmitter<string> = new EventEmitter();
    public mode: string = "editor"; // editor | html

    constructor(protected appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}    
    get editorCfgLtr(): any {return cfg.editorCfg;}
    get editorCfgRtl(): any {
        const config: any = {...cfg.editorCfg};
        config.directionality = "rtl";
        return config;
    }

    public onChange(): void {
        this.valueChange.emit(this.value);
    }
}