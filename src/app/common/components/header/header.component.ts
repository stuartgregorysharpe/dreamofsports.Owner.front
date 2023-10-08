import { Component } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "the-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"],
})
export class CHeaderComponent {
    constructor(private appService: CAppService) {}

    get sidebarActive(): boolean {return this.appService.sidebarActive;}
    set sidebarActive(v: boolean) {this.appService.sidebarActive = v;}
    get thelang(): IThelang {return this.appService.thelang;}
    get monitorActive(): boolean {return this.appService.options.monitorActive;}
}