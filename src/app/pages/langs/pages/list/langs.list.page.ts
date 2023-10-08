import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangsListService } from '../../services/langs.list.service';

@Component({
	selector: 'langs-list-page',
	templateUrl: './langs.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CLangsListPage extends CListPage<CLang> implements OnInit {    
    public homeUrl: string = "/localization/langs";    

    constructor(        
        protected langRepository: CLangRepository, 
        protected appService: CAppService,        
        protected listService: CLangsListService,        
    ) {      
        super(langRepository, appService, listService);
    }    

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["langs-head"]); 
            await this.initList();            
            this.appService.monitorLog("[langs] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
