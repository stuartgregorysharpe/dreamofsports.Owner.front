import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CMailtemplate } from 'src/app/model/entities/mailtemplate';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CMailtemplateRepository } from 'src/app/common/services/repositories/mailtemplate.repository';

@Component({
	selector: 'mailtemplates-edit-page',
	templateUrl: './mailtemplates.edit.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CMailtemplatesEditPage extends CEntityPage<CMailtemplate> implements OnInit {		
	public homeUrl: string = "/mailtemplates";
	public requiredFields: string[] = ["name"];	
	public ll: CLang[] = [];

	constructor(		
		protected mailtemplateRepository: CMailtemplateRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
		private langRepository: CLangRepository,
	) 
	{
		super(mailtemplateRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["mailtemplates-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.mailtemplateRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[mailtemplates edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

		return !error;
	}
}
