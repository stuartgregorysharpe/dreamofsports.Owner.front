import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CMessage } from 'src/app/model/entities/message';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CMessagesListService } from '../../services/messages.list.service';
import { CMessageRepository } from 'src/app/common/services/repositories/message.repository';

@Component({
	selector: 'messages-list-page',
	templateUrl: './messages.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
})
export class CMessagesListPage extends CListPage<CMessage> implements OnInit {    
    public homeUrl: string = "/messages";  
    
    constructor(        
        protected messageRepository: CMessageRepository, 
        protected appService: CAppService,        
        protected listService: CMessagesListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(messageRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["messages-head"]); 
            await this.initList();    
            this.appService.monitorLog("[messages] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

