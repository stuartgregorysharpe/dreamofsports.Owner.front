import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CSocial } from 'src/app/model/entities/social';
import { CAppService } from 'src/app/common/services/app.service';
import { CSocialsListService } from '../../services/socials.list.service';
import { CSocialRepository } from 'src/app/common/services/repositories/social.repository';

@Component({
	selector: 'socials-list-page',
	templateUrl: './socials.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CSocialsListPage extends CListPage<CSocial> implements OnInit {    
    public homeUrl: string = "/catalogue/socials";  
    
    constructor(        
        protected socialRepository: CSocialRepository, 
        protected appService: CAppService,        
        protected listService: CSocialsListService,  
    ) 
    {      
        super(socialRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["socials-head"]); 
            await this.initList();    
            this.appService.monitorLog("[socials] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

