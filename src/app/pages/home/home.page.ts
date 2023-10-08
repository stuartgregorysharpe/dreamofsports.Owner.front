import { Component, OnInit } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CAuthService } from "src/app/common/services/auth.service";
import { CSomePage } from "../some.page";

@Component({
    selector: "home-page",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class CHomePage extends CSomePage implements OnInit { 
    constructor(
        protected appService: CAppService,
        protected authService: CAuthService,
    ) 
    {
        super(appService);
    }  

    public ngOnInit(): void {        
        this.appService.setTitle(this.thelang.words["home-head"]); 
        this.appService.monitorLog("[home] page loaded");         
    } 
}