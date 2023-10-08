import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CUser } from 'src/app/model/entities/user';
import { CUserRepository } from 'src/app/common/services/repositories/user.repository';
import { CEntityPage } from 'src/app/pages/entity.page';

@Component({
	selector: 'users-create-page',
	templateUrl: './users.create.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CUsersCreatePage extends CEntityPage<CUser> implements OnInit {		
	public homeUrl: string = "/catalogue/users";
	public requiredFields: string[] = ["email", "password"];	
	public ll: CLang[] = [];

	constructor(		
		protected userRepository: CUserRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		protected langRepository: CLangRepository,     
	) 
	{
		super(userRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["users-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CUser().init(this.ll);	
			this.appService.monitorLog("[users create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.email = null;
		this.errors.password = null;

		if (!this.appService.validateEmail(this.x.email)) {
			this.errors.email = "common-error-email";
			error = true;
		}

		if (!this.x.password) {
			this.errors.password = "common-error-required";
			error = true;
		}

		return !error;
	}
}

