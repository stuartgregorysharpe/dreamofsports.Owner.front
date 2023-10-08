import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { filter } from "rxjs/operators";
import { Router } from "@angular/router";
import { IResponse } from "src/app/model/dto/response.interface";
import { IAdminAuthData } from "src/app/model/dto/admin.authdata.interface";
import { IAdminLogin } from "src/app/model/dto/admin.login.interface";
import { IAdminRecovery } from "src/app/model/dto/admin.recovery.interface";
import { cfg } from "src/app/app.config";
import { IThelang } from "src/app/model/entities/thelang";
import { IGetList } from "src/app/model/dto/getlist.interface";
import { IAdminVerify } from "src/app/model/dto/admin.verify.interface";
import { ISetting } from "src/app/model/entities/setting.interface";
import { IAdmin } from "src/app/model/entities/admin.interface";
import { IAdminGroup } from "src/app/model/entities/admin.group.interface";
import { ILang } from "src/app/model/entities/lang.interface";
import { IWordbook } from "src/app/model/entities/wordbook.interface";
import { IFile } from "src/app/model/entities/file.interface.";
import { IPage } from "src/app/model/entities/page.interface";
import { IMailtemplate } from "src/app/model/entities/mailtemplate.interface";
import { IBackup } from "src/app/model/entities/backup.interface";
import { IEmployee } from "src/app/model/entities/employee.interface";
import { IMessage } from "src/app/model/entities/message.interface";
import { IArticle } from "src/app/model/entities/article.interface";
import { IArticleCat } from "src/app/model/entities/article.cat.interface";
import { ICountry } from "src/app/model/entities/country.interface";
import { ICat } from "src/app/model/entities/cat.interface";
import { IUser } from "src/app/model/entities/user.interface";
import { ISocial } from "src/app/model/entities/social.interface";
import { IFavorite } from "src/app/model/entities/favorite.interface";
import { IBan } from "src/app/model/entities/ban.interface";
import { ITariff } from "src/app/model/entities/tariff.interface";
import { IPaysystem } from "src/app/model/entities/paysystem.interface";
import { IPayment } from "src/app/model/entities/payment.interface";
import { IStatUsersMonthly } from "src/app/model/entities/stats/stat.users.monthly.interface";
import { IStatCats } from "src/app/model/entities/stats/stat.cats.interface";
import { IStatTotals } from "src/app/model/entities/stats/stat.totals.interface";
import { IComplaint } from "src/app/model/entities/complaint.interface";
import { IModerableImage } from "src/app/model/entities/moderable.image.interface";

@Injectable()
export class CDataService {
    public authData: IAdminAuthData = null;    
    
    constructor (        
        private http: HttpClient,        
        private router: Router,
    ) {}   
    
    public thelangsAll(): Observable<IThelang[]> {return this.http.get<IThelang[]>(`/assets/json/thelangs.json`);}    

    public updateParam (obj: string, id: number, p: string, v:any): Observable<IResponse<void>> {return this.sendRequest("objects/update-param", {obj, id, p, v});}    
    public updateEgoisticParam (obj: string, id: number, p: string, v:boolean, filter: any): Observable<IResponse<void>> {return this.sendRequest("objects/update-egoistic-param", {obj, id, p, v, filter});}                
    
    public settingsChunk(dto: IGetList): Observable<IResponse<ISetting[]>> {return this.sendRequest("settings/chunk", dto);}
    public settingsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`settings/delete/${id}`);}
    public settingsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("settings/delete-bulk", ids);}    
    public settingsCreate(fd: FormData): Observable<IResponse<ISetting>> {return this.sendRequest("settings/create", fd);}
    
    public adminsChunk(dto: IGetList): Observable<IResponse<IAdmin[]>> {return this.sendRequest("admins/chunk", dto);}
    public adminsOne(id: number): Observable<IResponse<IAdmin>> {return this.sendRequest(`admins/one/${id}`);}
    public adminsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`admins/delete/${id}`);}
    public adminsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("admins/delete-bulk", ids);}
    public adminsCreate(fd: FormData): Observable<IResponse<IAdmin>> {return this.sendRequest("admins/create", fd);}
    public adminsUpdate(fd: FormData): Observable<IResponse<IAdmin>> {return this.sendRequest("admins/update", fd);}  
    public adminsLogin(dto: IAdminLogin): Observable<IResponse<IAdminAuthData>> {return this.sendRequest("admins/login", dto);}     
    public adminsVerify(dto: IAdminVerify): Observable<IResponse<void>> {return this.sendRequest("admins/verify", dto);}
    public adminsRecover(dto: IAdminRecovery): Observable<IResponse<void>> {return this.sendRequest("admins/recover", dto);} 
    public adminsMe(): Observable<IResponse<IAdmin>> {return this.sendRequest(`admins/me`);}

    public adminGroupsChunk(dto: IGetList): Observable<IResponse<IAdminGroup[]>> {return this.sendRequest("admingroups/chunk", dto);}   
    public adminGroupsOne(id: number): Observable<IResponse<IAdminGroup>> {return this.sendRequest(`admingroups/one/${id}`);} 
    
    public langsAll(dto: IGetList): Observable<IResponse<ILang[]>> {return this.sendRequest("langs/all", dto);}
    public langsChunk(dto: IGetList): Observable<IResponse<ILang[]>> {return this.sendRequest("langs/chunk", dto);}
    public langsOne(id: number): Observable<IResponse<ILang>> {return this.sendRequest(`langs/one/${id}`);}
    public langsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`langs/delete/${id}`);}
    public langsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("langs/delete-bulk", ids);}
    public langsCreate(fd: FormData): Observable<IResponse<ILang>> {return this.sendRequest("langs/create", fd);}
    public langsUpdate(fd: FormData): Observable<IResponse<ILang>> {return this.sendRequest("langs/update", fd);}   

    public wordbooksChunk(dto: IGetList): Observable<IResponse<IWordbook[]>> {return this.sendRequest("wordbooks/chunk", dto);}
    public wordbooksOne(id: number): Observable<IResponse<IWordbook>> {return this.sendRequest(`wordbooks/one/${id}`);}
    public wordbooksDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`wordbooks/delete/${id}`);}
    public wordbooksDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("wordbooks/delete-bulk", ids);}
    public wordbooksCreate(fd: FormData): Observable<IResponse<IWordbook>> {return this.sendRequest("wordbooks/create", fd);}
    public wordbooksUpdate(fd: FormData): Observable<IResponse<IWordbook>> {return this.sendRequest("wordbooks/update", fd);}    

    public filesChunk(dto: IGetList): Observable<IResponse<IFile[]>> {return this.sendRequest("files/chunk", dto);}
    public filesOne(id: number): Observable<IResponse<IFile>> {return this.sendRequest(`files/one/${id}`);}
    public filesDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`files/delete/${id}`);}
    public filesDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("files/delete-bulk", ids);}
    public filesCreate(fd: FormData): Observable<IResponse<IFile>> {return this.sendRequest("files/create", fd);}
    public filesUpdate(fd: FormData): Observable<IResponse<IFile>> {return this.sendRequest("files/update", fd);}  

    public pagesChunk(dto: IGetList): Observable<IResponse<IPage[]>> {return this.sendRequest("pages/chunk", dto);}
    public pagesOne(id: number): Observable<IResponse<IPage>> {return this.sendRequest(`pages/one/${id}`);}
    public pagesDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`pages/delete/${id}`);}
    public pagesDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("pages/delete-bulk", ids);}
    public pagesCreate(fd: FormData): Observable<IResponse<IPage>> {return this.sendRequest("pages/create", fd);}
    public pagesUpdate(fd: FormData): Observable<IResponse<IPage>> {return this.sendRequest("pages/update", fd);}  

    public mailtemplatesChunk(dto: IGetList): Observable<IResponse<IMailtemplate[]>> {return this.sendRequest("mailtemplates/chunk", dto);}
    public mailtemplatesOne(id: number): Observable<IResponse<IMailtemplate>> {return this.sendRequest(`mailtemplates/one/${id}`);}
    public mailtemplatesDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`mailtemplates/delete/${id}`);}
    public mailtemplatesDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("mailtemplates/delete-bulk", ids);}
    public mailtemplatesCreate(fd: FormData): Observable<IResponse<IMailtemplate>> {return this.sendRequest("mailtemplates/create", fd);}
    public mailtemplatesUpdate(fd: FormData): Observable<IResponse<IMailtemplate>> {return this.sendRequest("mailtemplates/update", fd);} 

    public backupsChunk(dto: IGetList): Observable<IResponse<IBackup[]>> {return this.sendRequest("backups/chunk", dto);}
    public backupsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`backups/delete/${id}`);}
    public backupsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("backups/delete-bulk", ids);}    
    public backupsCreate(): Observable<IResponse<void>> {return this.sendRequest("backups/create");}

    public employeesChunk(dto: IGetList): Observable<IResponse<IEmployee[]>> {return this.sendRequest("employees/chunk", dto);}
    public employeesOne(id: number): Observable<IResponse<IEmployee>> {return this.sendRequest(`employees/one/${id}`);}
    public employeesDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`employees/delete/${id}`);}
    public employeesDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("employees/delete-bulk", ids);}
    public employeesCreate(fd: FormData): Observable<IResponse<IEmployee>> {return this.sendRequest("employees/create", fd);}
    public employeesUpdate(fd: FormData): Observable<IResponse<IEmployee>> {return this.sendRequest("employees/update", fd);} 

    public messagesChunk(dto: IGetList): Observable<IResponse<IMessage[]>> {return this.sendRequest("messages/chunk", dto);}
    public messagesOne(id: number): Observable<IResponse<IMessage>> {return this.sendRequest(`messages/one/${id}`);}
    public messagesDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`messages/delete/${id}`);}
    public messagesDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("messages/delete-bulk", ids);}

    public articlesChunk(dto: IGetList): Observable<IResponse<IArticle[]>> {return this.sendRequest("articles/chunk", dto);}
    public articlesOne(id: number): Observable<IResponse<IArticle>> {return this.sendRequest(`articles/one/${id}`);}
    public articlesDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`articles/delete/${id}`);}
    public articlesDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("articles/delete-bulk", ids);}
    public articlesCreate(fd: FormData): Observable<IResponse<IArticle>> {return this.sendRequest("articles/create", fd);}
    public articlesUpdate(fd: FormData): Observable<IResponse<IArticle>> {return this.sendRequest("articles/update", fd);} 

    public articleCatsChunk(dto: IGetList): Observable<IResponse<IArticleCat[]>> {return this.sendRequest("article-cats/chunk", dto);}
    public articleCatsOne(id: number): Observable<IResponse<IArticleCat>> {return this.sendRequest(`article-cats/one/${id}`);}
    public articleCatsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`article-cats/delete/${id}`);}
    public articleCatsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("article-cats/delete-bulk", ids);}
    public articleCatsCreate(fd: FormData): Observable<IResponse<IArticleCat>> {return this.sendRequest("article-cats/create", fd);}
    public articleCatsUpdate(fd: FormData): Observable<IResponse<IArticleCat>> {return this.sendRequest("article-cats/update", fd);} 

    public countriesChunk(dto: IGetList): Observable<IResponse<ICountry[]>> {return this.sendRequest("countries/chunk", dto);}
    public countriesOne(id: number): Observable<IResponse<ICountry>> {return this.sendRequest(`countries/one/${id}`);}
    public countriesDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`countries/delete/${id}`);}
    public countriesDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("countries/delete-bulk", ids);}
    public countriesCreate(fd: FormData): Observable<IResponse<ICountry>> {return this.sendRequest("countries/create", fd);}
    public countriesUpdate(fd: FormData): Observable<IResponse<ICountry>> {return this.sendRequest("countries/update", fd);} 

    public catsChunk(dto: IGetList): Observable<IResponse<ICat[]>> {return this.sendRequest("cats/chunk", dto);}
    public catsOne(id: number): Observable<IResponse<ICat>> {return this.sendRequest(`cats/one/${id}`);}
    public catsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`cats/delete/${id}`);}
    public catsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("cats/delete-bulk", ids);}
    public catsCreate(fd: FormData): Observable<IResponse<ICat>> {return this.sendRequest("cats/create", fd);}
    public catsUpdate(fd: FormData): Observable<IResponse<ICat>> {return this.sendRequest("cats/update", fd);} 

    public usersChunk(dto: IGetList): Observable<IResponse<IUser[]>> {return this.sendRequest("users/chunk", dto);}
    public usersOne(id: number): Observable<IResponse<IUser>> {return this.sendRequest(`users/one/${id}`);}
    public usersDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`users/delete/${id}`);}
    public usersDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("users/delete-bulk", ids);}
    public usersCreate(fd: FormData): Observable<IResponse<IUser>> {return this.sendRequest("users/create", fd);}
    public usersUpdate(fd: FormData): Observable<IResponse<IUser>> {return this.sendRequest("users/update", fd);} 

    public socialsChunk(dto: IGetList): Observable<IResponse<ISocial[]>> {return this.sendRequest("socials/chunk", dto);}
    public socialsOne(id: number): Observable<IResponse<ISocial>> {return this.sendRequest(`socials/one/${id}`);}
    public socialsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`socials/delete/${id}`);}
    public socialsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("socials/delete-bulk", ids);}
    public socialsCreate(fd: FormData): Observable<IResponse<ISocial>> {return this.sendRequest("socials/create", fd);}
    public socialsUpdate(fd: FormData): Observable<IResponse<ISocial>> {return this.sendRequest("socials/update", fd);} 

    public favoritesChunk(dto: IGetList): Observable<IResponse<IFavorite[]>> {return this.sendRequest("favorites/chunk", dto);}
    public favoritesDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`favorites/delete/${id}`);}
    public favoritesDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("favorites/delete-bulk", ids);}
    public favoritesCreate(fd: FormData): Observable<IResponse<IFavorite>> {return this.sendRequest("favorites/create", fd);}

    public bansChunk(dto: IGetList): Observable<IResponse<IBan[]>> {return this.sendRequest("bans/chunk", dto);}
    public bansDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`bans/delete/${id}`);}
    public bansDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("bans/delete-bulk", ids);}
    public bansCreate(fd: FormData): Observable<IResponse<IBan>> {return this.sendRequest("bans/create", fd);}

    public tariffsChunk(dto: IGetList): Observable<IResponse<ITariff[]>> {return this.sendRequest("tariffs/chunk", dto);}
    public tariffsOne(id: number): Observable<IResponse<ITariff>> {return this.sendRequest(`tariffs/one/${id}`);}
    public tariffsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`tariffs/delete/${id}`);}
    public tariffsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("tariffs/delete-bulk", ids);}
    public tariffsCreate(fd: FormData): Observable<IResponse<ITariff>> {return this.sendRequest("tariffs/create", fd);}
    public tariffsUpdate(fd: FormData): Observable<IResponse<ITariff>> {return this.sendRequest("tariffs/update", fd);} 

    public paysystemsChunk(dto: IGetList): Observable<IResponse<IPaysystem[]>> {return this.sendRequest("paysystems/chunk", dto);}
    public paysystemsOne(id: number): Observable<IResponse<IPaysystem>> {return this.sendRequest(`paysystems/one/${id}`);}
    public paysystemsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`paysystems/delete/${id}`);}
    public paysystemsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("paysystems/delete-bulk", ids);}
    public paysystemsCreate(fd: FormData): Observable<IResponse<IPaysystem>> {return this.sendRequest("paysystems/create", fd);}
    public paysystemsUpdate(fd: FormData): Observable<IResponse<IPaysystem>> {return this.sendRequest("paysystems/update", fd);} 

    public paymentsChunk(dto: IGetList): Observable<IResponse<IPayment[]>> {return this.sendRequest("payments/chunk", dto);}
    public paymentsOne(id: number): Observable<IResponse<IPayment>> {return this.sendRequest(`payments/one/${id}`);}
    public paymentsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`payments/delete/${id}`);}
    public paymentsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("payments/delete-bulk", ids);}

    public statsUsersMonthly(year: number): Observable<IResponse<IStatUsersMonthly>> {return this.sendRequest(`stats/users-monthly/${year}`);}
    public statsCats(): Observable<IResponse<IStatCats>> {return this.sendRequest(`stats/cats`);}
    public statsPaymentsMonthly(year: number): Observable<IResponse<number[]>> {return this.sendRequest(`stats/payments-monthly/${year}`);}
    public statsTotals(): Observable<IResponse<IStatTotals>> {return this.sendRequest(`stats/totals`);}

    public complaintsChunk(dto: IGetList): Observable<IResponse<IComplaint[]>> {return this.sendRequest("complaints/chunk", dto);}
    public complaintsOne(id: number): Observable<IResponse<IComplaint>> {return this.sendRequest(`complaints/one/${id}`);}
    public complaintsDelete(id: number): Observable<IResponse<void>> {return this.sendRequest(`complaints/delete/${id}`);}
    public complaintsDeleteBulk(ids: number[]): Observable<IResponse<void>> {return this.sendRequest("complaints/delete-bulk", ids);}
    public complaintsUpdate(fd: FormData): Observable<IResponse<IComplaint>> {return this.sendRequest("complaints/update", fd);} 

    public moderableImagesChunk(dto: IGetList): Observable<IResponse<IModerableImage[]>> {return this.sendRequest("moderable-images/chunk", dto);}
    
    ////////////////
    // utils
    ////////////////

    private sendRequest (url: string, body: Object = null): Observable<any> {    
        const headersContent = {};    
        this.authData?.token && (headersContent["token"] = this.authData.token);
        const headers = new HttpHeaders(headersContent);
        return this.http
            .post(`${cfg.apiUrl}/${url}`, body, {headers})
            .pipe(filter(res => this.processResponse(res)));               
    }

    private processResponse(res: any): boolean {        
        if (res.statusCode === 403) {
            console.log(res.error);
            this.router.navigateByUrl("/auth/logout");
            return false;
        } 
            
        return true;        
    }   
}