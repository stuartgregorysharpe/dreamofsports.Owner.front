import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CArticleCat } from 'src/app/model/entities/article.cat';
import { CArticleCatRepository } from 'src/app/common/services/repositories/article.cat.repository';

@Component({
	selector: 'articlecats-create-page',
	templateUrl: './article.cats.create.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CArticleCatsCreatePage extends CEntityPage<CArticleCat> implements OnInit {		
	public homeUrl: string = "/articles/cats";
	public requiredFields: string[] = ["name", "slug"];	
	public ll: CLang[] = [];

	constructor(		
		protected articleCatRepository: CArticleCatRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		private langRepository: CLangRepository,     
	) 
	{
		super(articleCatRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["articlecats-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CArticleCat().init(this.ll);	
			this.appService.monitorLog("[article.cats create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.slug = null;

		for (let t of this.x.translations) {
			if (!t.name) {
				this.errors.name = "common-error-required-ml";
				error = true;
			}
		}

		if (!this.x.slug) {
			this.errors.slug = "common-error-required";
			error = true;
		}

		return !error;
	}
}

