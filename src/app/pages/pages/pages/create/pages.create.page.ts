import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CPage } from 'src/app/model/entities/page';
import { CLang } from 'src/app/model/entities/lang';
import { CPageRepository } from 'src/app/common/services/repositories/page.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';

@Component({
	selector: 'pages-create-page',
	templateUrl: './pages.create.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CPagesCreatePage extends CEntityPage<CPage> implements OnInit {		
	public homeUrl: string = "/pages";
	public requiredFields: string[] = ["slug", "name"];	
	public ll: CLang[] = [];

	constructor(		
		protected pageRepository: CPageRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		protected langRepository: CLangRepository,     
	) 
	{
		super(pageRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["pages-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CPage().init(this.ll);					
			this.appService.monitorLog("[pages create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.slug = null;
		this.errors.name = null;

		if (!this.x.slug) {
			this.errors.slug = "common-error-required";
			error = true;
		}

		for (let t of this.x.translations) {
			if (!t.name) {
				this.errors.name = "common-error-required-ml";
				error = true;
			}
		}

		return !error;
	}
}

