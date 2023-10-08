import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IAdminRecovery } from "src/app/model/dto/admin.recovery.interface";
import { CAppService } from "src/app/common/services/app.service";
import { IThelang } from "src/app/model/entities/thelang";
import { CAuthService } from "src/app/common/services/auth.service";

@Component({
    selector: "recover-auth-page",
    templateUrl: "recover.auth.page.html",
    styleUrls: [
        "../auth.scss", 
        "../../../common/styles/forms.scss",
    ],
})
export class CRecoverAuthPage implements OnInit {
    public email: string = "";    
    public code: string = "";
    public codeSending: boolean = false;  
    public codeSent: boolean = false; 
    public password: string = "";
    public password2: string = "";
    public formSending: boolean = false;    
    public formSent: boolean = false;
    public errors: any = {};
    
    constructor(
        private appService: CAppService,
        private authService: CAuthService,    
        private router: Router,
    ) {}
    
    get thelang(): IThelang {return this.appService.thelang;}    

    public ngOnInit(): void {
        this.authService.authData && this.router.navigateByUrl("/");
        this.appService.setTitle(this.thelang.words["recover-head"]);  
    }
    
    public async recover(): Promise<void> {
        try {                        
            if (this.formValidate()) {
                this.formSending = true;
                const dto: IAdminRecovery = {email: this.email, password: this.password, code: this.code};
                const statusCode = await this.authService.recover(dto);
                this.formSending = false;

                if (statusCode === 200) {                    
                    this.formSent = true;
                } else if (statusCode === 404) {
                    this.errors["email"] = 'recover-error-emailnotexists';
                } else if (statusCode === 401) {
                    this.errors["code"] = 'recover-error-codeinvalid';
                    this.codeSent = false;
                } else {
                    this.appService.monitorLog(this.thelang.words["common-error"], true);
                }                
            }            
        } catch (err) {
            this.appService.monitorLog(err, true);
            this.formSending = false;
        }
    }

    public async verify(): Promise<void> {
        try {
            if (this.emailValidate()) {
                this.codeSending = true;
                await this.authService.verify({email: this.email});
                this.codeSending = false;
                this.codeSent = true;     
                await this.appService.pause(5000);
                this.codeSent = false;           
            }
        } catch (err) {
            this.appService.monitorLog(err, true);
            this.codeSending = false;
        }
    }    

    public formValidate(): boolean {
        let error = false;
        this.errors["email"] = null;
        this.errors["password"] = null;
        this.errors["password2"] = null;
        this.errors["code"] = null;

        if (!this.email.length || !this.appService.validateEmail(this.email)) {
            error = true;
            this.errors["email"] = 'recover-error-email';
        }

        if (this.password.length < 3) {
            error = true;
            this.errors["password"] = 'recover-error-password';
        }

        if (this.password !== this.password2) {
            error = true;
            this.errors["password2"] = 'recover-error-password2';
        }

        if (this.code.length < 6) {
            error = true;
            this.errors["code"] = "recover-error-code";
        }        
        
        return !error;
    }

    private emailValidate(): boolean {
        let error = false;
        this.errors["email"] = null;

        if (!this.email.length || !this.appService.validateEmail(this.email)) {
            error = true;
            this.errors["email"] = 'recover-error-email';
        }

        return !error;
    }
}