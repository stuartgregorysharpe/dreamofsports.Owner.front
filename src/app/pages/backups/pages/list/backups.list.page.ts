import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CBackup } from 'src/app/model/entities/backup';
import { CBackupRepository } from 'src/app/common/services/repositories/backup.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { cfg } from 'src/app/app.config';
import { BackupsListService } from '../../services/backups.list.service';

@Component({
	selector: 'backups-list-page',
	templateUrl: './backups.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CBackupsListPage extends CListPage<CBackup> implements OnInit {    
    public homeUrl: string = "/backups";    

    constructor(        
        protected backupRepository: CBackupRepository, 
        protected appService: CAppService,        
        protected listService: BackupsListService,                
    ) 
    {      
        super(backupRepository, appService, listService);
    }  
    
    get backupUrl(): string {return cfg.backupUrl;}

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["backups-head"]); 
            await this.initList();            
            this.appService.monitorLog("[backups] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }   
    
    public onSelectAll(): void {
        this.xl.filter(x => !x.defended && x.ready).forEach(x => {x.__selected = this.allSelected});
    }

    public async create(): Promise<void> {
		try {
            if (confirm(this.thelang.words['common-sure'])) {
                this.reloading = true;
			    this.appService.monitorLog(`starting backup...`);
			    await this.repository.create();
                await this.initList(true); 
			    this.appService.monitorLog(`backup started`);    
            }			        
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            await this.appService.pause(500);
            this.reloading = false;            
		}
    }
}
