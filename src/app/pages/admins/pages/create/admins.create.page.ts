import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CAdmin } from 'src/app/model/entities/admin';
import { CAdminRepository } from 'src/app/common/services/repositories/admin.repository';
import { CAppService } from 'src/app/common/services/app.service';

@Component({
	selector: 'admins-create-page',
	templateUrl: './admins.create.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CAdminsCreatePage extends CEntityPage<CAdmin> implements OnInit {		
	public homeUrl: string = "/admins";
	public requiredFields: string[] = ["name", "email", "password"];	

	constructor(		
		protected adminRepository: CAdminRepository,		
		protected appService: CAppService,		
		protected router: Router,		
	) 
	{
		super(adminRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {		
			this.appService.setTitle(`${this.thelang.words["admins-head"]} - ${this.thelang.words["common-create"]}`); 		
			this.x = new CAdmin().init();
			this.appService.monitorLog("[admins create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.email = null;
		this.errors.password = null;

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

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
