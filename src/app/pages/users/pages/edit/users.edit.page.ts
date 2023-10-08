import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CUserRepository } from 'src/app/common/services/repositories/user.repository';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CUser } from 'src/app/model/entities/user';

@Component({
	selector: 'users-edit-page',
	templateUrl: './users.edit.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CUsersEditPage extends CEntityPage<CUser> implements OnInit {		
	public homeUrl: string = "/catalogue/users";
	public requiredFields: string[] = ["email"];	
	public ll: CLang[] = [];

	constructor(		
		protected userRepository: CUserRepository,		
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,			
		protected langRepository: CLangRepository,
	) 
	{
		super(userRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["users-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.userRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[users edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.email = null;

		if (!this.appService.validateEmail(this.x.email)) {
			this.errors.email = "common-error-email";
			error = true;
		}

		return !error;
	}
}
