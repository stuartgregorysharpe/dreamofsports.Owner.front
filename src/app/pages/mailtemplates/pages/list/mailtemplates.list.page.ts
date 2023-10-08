import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CMailtemplate } from 'src/app/model/entities/mailtemplate';
import { CAppService } from 'src/app/common/services/app.service';
import { CMailtemplatesListService } from '../../services/mailtemplates.list.service';
import { CMailtemplateRepository } from 'src/app/common/services/repositories/mailtemplate.repository';

@Component({
	selector: 'mailtemplates-list-page',
	templateUrl: './mailtemplates.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CMailtemplatesListPage extends CListPage<CMailtemplate> implements OnInit {    
    public homeUrl: string = "/mailtemplates";  
    
    constructor(        
        protected mailtemplateRepository: CMailtemplateRepository, 
        protected appService: CAppService,        
        protected listService: CMailtemplatesListService,  
    ) 
    {      
        super(mailtemplateRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["mailtemplates-head"]); 
            await this.initList();    
            this.appService.monitorLog("[mailtemplates] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

