import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CSetting } from 'src/app/model/entities/setting';
import { CSettingRepository } from 'src/app/common/services/repositories/setting.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CSettingsListService } from '../../services/settings.list.service';

@Component({
	selector: 'settings-list-page',
	templateUrl: './settings.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CSettingsListPage extends CListPage<CSetting> implements OnInit {    
    public homeUrl: string = "/settings";    

    constructor(        
        protected settingRepository: CSettingRepository, 
        protected appService: CAppService,        
        protected listService: CSettingsListService,                
    ) {      
        super(settingRepository, appService, listService);
    }    

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["settings-head"]); 
            await this.initList();            
            this.appService.monitorLog("[settings] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
