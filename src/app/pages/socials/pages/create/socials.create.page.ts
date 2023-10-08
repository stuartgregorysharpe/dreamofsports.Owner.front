import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CSocial } from 'src/app/model/entities/social';
import { CAppService } from 'src/app/common/services/app.service';
import { CSocialRepository } from 'src/app/common/services/repositories/social.repository';

@Component({
	selector: 'socials-create-page',
	templateUrl: './socials.create.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CSocialsCreatePage extends CEntityPage<CSocial> implements OnInit {		
	public homeUrl: string = "/catalogue/socials";
	public requiredFields: string[] = ["name", "url", "img"];	

	constructor(		
		protected socialRepository: CSocialRepository,		
		protected appService: CAppService,		
		protected router: Router,		
	) 
	{
		super(socialRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["socials-head"]} - ${this.thelang.words["common-create"]}`); 
			this.x = new CSocial().init();	
			this.appService.monitorLog("[socials create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.url = null;
		this.errors.img = null;

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

		if (!this.x.url) {
			this.errors.url = "common-error-required";
			error = true;
		}

		if (!this.x.img) {
			this.errors.img = "common-error-required";
			error = true;
		}

		return !error;
	}
}

