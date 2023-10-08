import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CWordbook } from 'src/app/model/entities/wordbook';
import { CLang } from 'src/app/model/entities/lang';
import { CWordbookRepository } from 'src/app/common/services/repositories/wordbook.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';

@Component({
	selector: 'wordbooks-edit-page',
	templateUrl: './wordbooks.edit.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CWordbooksEditPage extends CEntityPage<CWordbook> implements OnInit {	
	public homeUrl: string = "/localization/wordbooks";
	public requiredFields: string[] = ["name"];	
	public ll: CLang[] = [];

	constructor(		
		protected wordbookRepository: CWordbookRepository,
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,	
		protected langRepository: CLangRepository,
	) {
		super(wordbookRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {		
			this.appService.setTitle(`${this.thelang.words["wordbooks-head"]} - ${this.thelang.words["common-edit"]}`); 		
			this.x = await this.wordbookRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[wordbooks edit] page loaded");
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
