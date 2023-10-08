import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CAdmin } from 'src/app/model/entities/admin';
import { CAdminRepository } from 'src/app/common/services/repositories/admin.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CAuthService } from 'src/app/common/services/auth.service';

@Component({
	selector: 'admins-edit-page',
	templateUrl: './admins.edit.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CAdminsEditPage extends CEntityPage<CAdmin> implements OnInit {		
	public homeUrl: string = "/admins";
	public requiredFields: string[] = ["name", "email"];	

	constructor(		
		protected adminRepository: CAdminRepository,		
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,	
		protected authService: CAuthService,	
	) 
	{
		super(adminRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {				
			this.appService.setTitle(`${this.thelang.words["admins-head"]} - ${this.thelang.words["common-edit"]}`); 		
			this.x = await this.adminRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[admins edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}

	public async update(): Promise<void> {
		try {
			if (!this.validate()) {
                return;
            }
			
			this.reloading = true;
            this.appService.monitorLog(`updating object...`);
            const updated = await this.repository.update(this.x);
            this.appService.monitorLog(`object updated`);  
            await this.appService.pause(500);          
            this.reloading = false;
			updated.id === this.authService.admin.id && this.authService.updateAdmin(updated);
            this.router.navigateByUrl(this.homeUrl);			                        
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            await this.appService.pause(500);
            this.reloading = false;           
		}
    }	

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.email = null;

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

		if (!this.appService.validateEmail(this.x.email)) {
			this.errors.email = "common-error-email";
			error = true;
		}

		return !error;
	}
}
