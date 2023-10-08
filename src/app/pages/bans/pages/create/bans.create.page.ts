import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CBan } from 'src/app/model/entities/ban';
import { CAppService } from 'src/app/common/services/app.service';
import { CBanRepository } from 'src/app/common/services/repositories/ban.repository';

@Component({
	selector: 'bans-create-page',
	templateUrl: './bans.create.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CBansCreatePage extends CEntityPage<CBan> implements OnInit {		
	public homeUrl: string = "/catalogue/bans";
	public requiredFields: string[] = ["user_id", "banned_id"];	

	constructor(		
		protected banRepository: CBanRepository,		
		protected appService: CAppService,		
		protected router: Router,		
	) 
	{
		super(banRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["bans-head"]} - ${this.thelang.words["common-create"]}`); 
			this.x = new CBan().init();	
			this.appService.monitorLog("[bans create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.user_id = null;
		this.errors.banned_id = null;

		if (!this.x.user_id) {
			this.errors.user_id = "common-error-required";
			error = true;
		}

		if (!this.x.banned_id) {
			this.errors.banned_id = "common-error-required";
			error = true;
		}

		return !error;
	}
}

