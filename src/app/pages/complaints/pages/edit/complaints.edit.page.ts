import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CComplaint } from 'src/app/model/entities/complaint';
import { CAppService } from 'src/app/common/services/app.service';
import { CComplaintRepository } from 'src/app/common/services/repositories/complaint.repository';

@Component({
	selector: 'complaints-edit-page',
	templateUrl: './complaints.edit.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CComplaintsEditPage extends CEntityPage<CComplaint> implements OnInit {		
	public homeUrl: string = "/moderation/complaints";
	public requiredFields: string[] = [];	

	constructor(		
		protected complaintRepository: CComplaintRepository,		
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,			
	) 
	{
		super(complaintRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["complaints-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.complaintRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[complaints edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		return true;
	}
}
