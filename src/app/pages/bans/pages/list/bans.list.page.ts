import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CBan } from 'src/app/model/entities/ban';
import { CAppService } from 'src/app/common/services/app.service';
import { CBansListService } from '../../services/bans.list.service';
import { CBanRepository } from 'src/app/common/services/repositories/ban.repository';

@Component({
	selector: 'bans-list-page',
	templateUrl: './bans.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CBansListPage extends CListPage<CBan> implements OnInit {    
    public homeUrl: string = "/catalogue/bans";  
    
    constructor(        
        protected banRepository: CBanRepository, 
        protected appService: CAppService,        
        protected listService: CBansListService,  
    ) 
    {      
        super(banRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["bans-head"]); 
            await this.initList();    
            this.appService.monitorLog("[bans] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

