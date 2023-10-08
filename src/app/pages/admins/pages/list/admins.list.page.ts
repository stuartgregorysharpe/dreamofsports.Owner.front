import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CAdmin } from 'src/app/model/entities/admin';
import { CAdminRepository } from 'src/app/common/services/repositories/admin.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CAuthService } from 'src/app/common/services/auth.service';
import { CAdminsListService } from '../../services/admins.list.service';
import { CEntity } from 'src/app/model/entities/_entity';

@Component({
	selector: 'admins-list-page',
	templateUrl: './admins.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CAdminsListPage extends CListPage<CAdmin> implements OnInit {    
    public homeUrl: string = "/admins";

    constructor(        
        protected adminRepository: CAdminRepository, 
        protected appService: CAppService,        
        protected listService: CAdminsListService,
        protected authService: CAuthService,    
    ) 
    {      
        super(adminRepository, appService, listService);
    }    

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["admins-head"]); 
            await this.initList();
            this.appService.monitorLog("[admins] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    } 
    
    public async updateParam(e: CEntity, p: string): Promise<void> {
        try {
            await super.updateParam(e, p);
            e.id === this.authService.authData.id && this.authService.updateAdmin(this.xl.find(x => x.id === e.id));            
        } catch (err) {
            this.appService.monitorLog(err, true);
        }        
    }
}
