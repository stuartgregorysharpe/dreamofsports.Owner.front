import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CFavorite } from 'src/app/model/entities/favorite';
import { CAppService } from 'src/app/common/services/app.service';
import { CFavoriteRepository } from 'src/app/common/services/repositories/favorite.repository';

@Component({
	selector: 'favorites-create-page',
	templateUrl: './favorites.create.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CFavoritesCreatePage extends CEntityPage<CFavorite> implements OnInit {		
	public homeUrl: string = "/catalogue/favorites";
	public requiredFields: string[] = ["user_id", "favorite_id"];	

	constructor(		
		protected favoriteRepository: CFavoriteRepository,		
		protected appService: CAppService,		
		protected router: Router,		
	) 
	{
		super(favoriteRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["favorites-head"]} - ${this.thelang.words["common-create"]}`); 
			this.x = new CFavorite().init();	
			this.appService.monitorLog("[favorites create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.user_id = null;
		this.errors.favorite_id = null;

		if (!this.x.user_id) {
			this.errors.user_id = "common-error-required";
			error = true;
		}

		if (!this.x.favorite_id) {
			this.errors.favorite_id = "common-error-required";
			error = true;
		}

		return !error;
	}
}

