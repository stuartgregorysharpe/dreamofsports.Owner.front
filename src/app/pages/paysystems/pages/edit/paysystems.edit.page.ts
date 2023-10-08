import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CPaysystem } from 'src/app/model/entities/paysystem';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CPaysystemRepository } from 'src/app/common/services/repositories/paysystem.repository';

@Component({
	selector: 'paysystems-edit-page',
	templateUrl: './paysystems.edit.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CPaysystemsEditPage extends CEntityPage<CPaysystem> implements OnInit {		
	public homeUrl: string = "/finances/paysystems";
	public requiredFields: string[] = ["name", "title"];	
	public ll: CLang[] = [];

	constructor(		
		protected paysystemRepository: CPaysystemRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
		private langRepository: CLangRepository,
	) 
	{
		super(paysystemRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["paysystems-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.paysystemRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[paysystems edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.title = null;

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

		for (let t of this.x.translations) {
			if (!t.title) {
				this.errors.title = "common-error-required-ml";
				error = true;
			}
		}

		return !error;
	}
}
