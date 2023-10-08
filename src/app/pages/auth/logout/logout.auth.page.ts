import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Timeout } from "src/app/common/decorators/timeout";
import { CAuthService } from "src/app/common/services/auth.service";

@Component({
    selector: "logout-auth-page",
    template: "",
})
export class CLogoutAuthPage implements OnInit {
    constructor(
        private authService: CAuthService,
        private router: Router,        
    ) {}

    @Timeout(1)
    public async ngOnInit(): Promise<void> {                
        this.authService.logout();            
        this.router.navigateByUrl("/auth/login");
    }
}