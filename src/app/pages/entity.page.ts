import { Router } from '@angular/router';
import { CEntity } from '../model/entities/_entity';
import { CRepository } from '../common/services/repositories/_repository';
import { CAppService } from '../common/services/app.service';
import { IKeyValue } from '../model/keyvalue.interface';
import { CSomePage } from './some.page';

export abstract class CEntityPage<T extends CEntity> extends CSomePage {
    public x: T = null;
    public ready: boolean = false;
    public reloading: boolean = false;      
    public requiredFields: string[] = [];    
    public homeUrl: string = null;
    public errors: IKeyValue<string> = {};
	
    constructor(        
        protected repository: CRepository<T>,
        protected appService: CAppService,
        protected router: Router,
    ) 
    {
        super(appService);
    }

    protected abstract validate(): boolean;

    public async create(): Promise<void> {
		try {
            if (!this.validate()) return;
			this.reloading = true;
			this.appService.monitorLog(`creating object...`);
			await this.repository.create(this.x);
			this.appService.monitorLog(`object created`);            
            await this.appService.pause(500);
            this.reloading = false;
            this.router.navigateByUrl(this.homeUrl);            
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            await this.appService.pause(500);
            this.reloading = false;            
		}
    }
    
    public async update(): Promise<void> {
		try {
            if (!this.validate()) return;
			this.reloading = true;
            this.appService.monitorLog(`updating object...`);
            await this.repository.update(this.x);
            this.appService.monitorLog(`object updated`);  
            await this.appService.pause(500);          
            this.reloading = false;
            this.router.navigateByUrl(this.homeUrl);			                        
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            await this.appService.pause(500);
            this.reloading = false;           
		}
    } 
    
    public async delete(): Promise<void> {
        try {
            if (confirm(this.thelang.words['common-sure'])) {
                this.reloading = true;
                this.appService.monitorLog(`deleting object: id=${this.x.id}`);
                await this.repository.delete(this.x.id);                
                this.appService.monitorLog("ok");
                await this.appService.pause(500);          
                this.reloading = false;
                this.router.navigateByUrl(this.homeUrl);            
            }            
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);    
            this.reloading = false;          
        }
    }
}
