import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CComplaint } from 'src/app/model/entities/complaint';
import { CAppService } from 'src/app/common/services/app.service';
import { CComplaintsListService } from '../../services/complaints.list.service';
import { CComplaintRepository } from 'src/app/common/services/repositories/complaint.repository';

@Component({
	selector: 'complaints-list-page',
	templateUrl: './complaints.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CComplaintsListPage extends CListPage<CComplaint> implements OnInit {    
    public homeUrl: string = "/moderation/complaints";  
    
    constructor(        
        protected complaintRepository: CComplaintRepository, 
        protected appService: CAppService,        
        protected listService: CComplaintsListService,  
    ) 
    {      
        super(complaintRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["complaints-head"]); 
            await this.initList();    
            this.appService.monitorLog("[complaints] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

