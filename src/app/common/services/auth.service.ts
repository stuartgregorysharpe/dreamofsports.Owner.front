import { Injectable } from "@angular/core";
import { IAdminVerify } from "src/app/model/dto/admin.verify.interface";
import { IAdminAuthData } from "src/app/model/dto/admin.authdata.interface";
import { IAdminLogin } from "src/app/model/dto/admin.login.interface";
import { IAdminRecovery } from "src/app/model/dto/admin.recovery.interface";
import { CAdmin } from "src/app/model/entities/admin";
import { CDataService } from './data.service';
import { CAppService } from "./app.service";

@Injectable()
export class CAuthService {  
    public admin: CAdmin = null;

    constructor(
        private dataService: CDataService,
        private appService: CAppService,
    ) 
    {
        const data = localStorage.getItem("authdata");
        data && this.init(JSON.parse(data));  
    }

    get authData(): IAdminAuthData {return this.dataService.authData;}  
    set authData(v: IAdminAuthData) {this.dataService.authData = v;}

    private async init(data: IAdminAuthData): Promise<void> {     
        try {
            this.authData = data;         
            this.admin = await this.loadAdmin();
        } catch (err) {
            this.appService.monitorLog(err, true);
        }        
    }  
    
    public logout(): void {        
        this.authData = null;  
        localStorage.removeItem("authdata");                 
    }

    private save(): void {        
        localStorage.setItem("authdata", JSON.stringify(this.authData));
    }

    public updateAdmin(admin: CAdmin): void {
        this.admin = new CAdmin().build(admin);
    }

    private loadAdmin(): Promise<CAdmin> {
        return new Promise((resolve, reject) => 
            this.dataService
                .adminsMe()
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CAdmin().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message),
                }                
            ));
    }  

    public login(dto: IAdminLogin): Promise<number> {
        return new Promise((resolve, reject) => 
            this.dataService
                .adminsLogin(dto)
                .subscribe({
                    error: err => reject(err.message),
                    next: res => {                
                        if (res.statusCode === 200) {    
                            this.init(res.data);                                
                            this.save();                                        
                        }
    
                        resolve(res.statusCode);
                    }}));        
    }
    
    public verify(dto: IAdminVerify): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .adminsVerify(dto)
                .subscribe({
                    next: res => resolve(),
                    error: err => reject(err.message),
                }));
    }    
    
    public recover(dto: IAdminRecovery): Promise<number> {
        return new Promise((resolve, reject) => 
            this.dataService
                .adminsRecover(dto)
                .subscribe({
                    next: res => resolve(res.statusCode),
                    error: err => reject(err.message),
                }));
    } 
}