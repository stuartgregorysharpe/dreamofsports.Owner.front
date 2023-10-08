import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CMessage } from 'src/app/model/entities/message';
import { CAppService } from 'src/app/common/services/app.service';
import { CMessageRepository } from 'src/app/common/services/repositories/message.repository';

@Component({
	selector: 'messages-edit-page',
	templateUrl: './messages.edit.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CMessagesEditPage extends CEntityPage<CMessage> implements OnInit {		
	public homeUrl: string = "/messages";
	public requiredFields: string[] = [];	

	constructor(		
		protected messageRepository: CMessageRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
	) 
	{
		super(messageRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["messages-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.messageRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[messages edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		return true;
	}
}
