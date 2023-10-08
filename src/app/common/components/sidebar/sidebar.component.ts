import { Component } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CAdmin } from "src/app/model/entities/admin";
import { IThelang } from "src/app/model/entities/thelang";
import { CAuthService } from "src/app/common/services/auth.service";

@Component({
    selector: "the-sidebar",
    templateUrl: "sidebar.component.html",
    styleUrls: ["sidebar.component.scss"],
})
export class CSidebarComponent {
    constructor(
        private appService: CAppService,
        private authService: CAuthService,
    ) {}

    get thelang(): IThelang {return this.appService.thelang;} 
    get active(): boolean {return this.appService.sidebarActive;}
    set active(v: boolean) {this.appService.sidebarActive = v;}
    get admin(): CAdmin {return this.authService.admin;}
}