import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CCat } from 'src/app/model/entities/cat';
import { CLang } from 'src/app/model/entities/lang';
import { CCatRepository } from 'src/app/common/services/repositories/cat.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';

@Component({
	selector: 'cats-edit-page',
	templateUrl: './cats.edit.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CCatsEditPage extends CEntityPage<CCat> implements OnInit {		
	public homeUrl: string = "/catalogue/cats";
	public requiredFields: string[] = ["slug", "name"];	
	public ll: CLang[] = [];

	constructor(		
		protected catRepository: CCatRepository,		
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,			
		protected langRepository: CLangRepository,
	) 
	{
		super(catRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["cats-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.catRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[cats edit] page loaded");
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

