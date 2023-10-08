import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CAppService } from "src/app/common/services/app.service";
import { IThelang } from "src/app/model/entities/thelang";
import { CAuthService } from "src/app/common/services/auth.service";
import { IAdminLogin } from "src/app/model/dto/admin.login.interface";

@Component({
    selector: "login-auth-page",
    templateUrl: "login.auth.page.html",
    styleUrls: [
        "../auth.scss", 
        "../../../common/styles/forms.scss",
    ],
})
export class CLoginAuthPage implements OnInit {
    public email: string = "";
    public password: string = "";    
    public formSending: boolean = false;  
    public errors: any = {};  
    
    constructor(
        private appService: CAppService,
        private authService: CAuthService,
        private router: Router,
    ) {}
    
    get thelang(): IThelang {return this.appService.thelang;}    

    public ngOnInit(): void {
        this.authService.authData && this.router.navigateByUrl("/");
        this.appService.setTitle(this.thelang.words["login-head"]);       
    } 
    
    public async login(): Promise<void> {
        try {            
            if (this.formValidate()) {
                this.formSending = true;
                this.errors["form"] = null;
                const dto: IAdminLogin = {email: this.email, password: this.password};
                const statusCode = await this.authService.login(dto);
                this.formSending = false;
    
                if (statusCode === 200) {
                    this.router.navigateByUrl("/");                      
                } else if (statusCode === 401) {
                    this.errors["form"] = "login-error-denied";
                } else {
                    this.appService.monitorLog(this.thelang.words["common-error"], true);
                } 
            }            
        } catch (err) {
            this.appService.monitorLog(err, true);
            this.formSending = false;
        }
    }    

    public formValidate(): boolean {
        let error = false;
        this.errors["email"] = null;
        this.errors["password"] = null;

        if (!this.email.length) {
            error = true;
            this.errors["email"] = "login-error-email";
        }

        if (!this.password.length) {
            error = true;
            this.errors["password"] = "login-error-password";
        }
        
        return !error;
    }
}