import { Component } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CAuthService } from "src/app/common/services/auth.service";
import { CMenubtnComponent } from "../menubtn.component";

@Component({
    selector: "menubtn-profile",
    templateUrl: "menubtn-profile.component.html",
    styleUrls: [        
        "../menubtn.component.scss",
        "menubtn-profile.component.scss",
    ],
})
export class CMenubtnProfileComponent extends CMenubtnComponent {
    public menuWidth: number = 200; 

    constructor(
        protected appService: CAppService,
        protected authService: CAuthService,
    ) 
    {
        super(appService);
    }
    
    get admin_id(): number {return this.authService.authData.id;}
}
