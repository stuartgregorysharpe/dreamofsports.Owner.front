import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CWordbook } from 'src/app/model/entities/wordbook';
import { CWordbookRepository } from 'src/app/common/services/repositories/wordbook.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CWordbooksListService } from '../../services/wordbooks.list.service';

@Component({
	selector: 'wordbooks-list-page',
	templateUrl: './wordbooks.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CWordbooksListPage extends CListPage<CWordbook> implements OnInit {    
    public homeUrl: string = "/localization/wordbooks";    

    constructor(        
        protected wordbookRepository: CWordbookRepository, 
        protected appService: CAppService,        
        protected listService: CWordbooksListService,        
    ) {      
        super(wordbookRepository, appService, listService);
    }    

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["wordbooks-head"]); 
            await this.initList();            
            this.appService.monitorLog("[wordbooks] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
