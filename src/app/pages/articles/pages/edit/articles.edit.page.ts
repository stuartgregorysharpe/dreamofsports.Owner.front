import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CArticle } from 'src/app/model/entities/article';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CArticleRepository } from 'src/app/common/services/repositories/article.repository';

@Component({
	selector: 'articles-edit-page',
	templateUrl: './articles.edit.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CArticlesEditPage extends CEntityPage<CArticle> implements OnInit {		
	public homeUrl: string = "/articles/articles";
	public requiredFields: string[] = ["slug", "name", "img"];	
	public ll: CLang[] = [];

	constructor(		
		protected articleRepository: CArticleRepository,		
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,			
		protected langRepository: CLangRepository,
	) 
	{
		super(articleRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["articles-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.articleRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[articles edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.slug = null;
		this.errors.img = null;
		this.errors.name = null;

		if (!this.x.slug) {
			this.errors.slug = "common-error-required";
			error = true;
		}

		if (!this.x.img) {
			this.errors.img = "common-error-required";
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
