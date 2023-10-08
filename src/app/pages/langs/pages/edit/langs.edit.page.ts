import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CAppService } from 'src/app/common/services/app.service';

@Component({
	selector: 'langs-edit-page',
	templateUrl: './langs.edit.page.html',
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,	
})
export class CLangsEditPage extends CEntityPage<CLang> implements OnInit {	
	public homeUrl: string = "/localization/langs";
	public requiredFields: string[] = ["slug"];	

	constructor(		
		protected langRepository: CLangRepository,
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(langRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {				
			this.appService.setTitle(`${this.thelang.words["langs-head"]} - ${this.thelang.words["common-edit"]}`); 
			this.x = await this.langRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[langs edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	
	
	protected validate(): boolean {
		let error = false;
		this.errors.slug = null;

		if (!this.x.slug) {
			this.errors.slug = "common-error-required";
			error = true;
		}

		return !error;
	}
}
