import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CSetting } from 'src/app/model/entities/setting';
import { CSettingRepository } from 'src/app/common/services/repositories/setting.repository';
import { CAppService } from 'src/app/common/services/app.service';

@Component({
	selector: 'settings-create-page',
	templateUrl: './settings.create.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CSettingsCreatePage extends CEntityPage<CSetting> implements OnInit {	
	public homeUrl: string = "/settings";
	public requiredFields: string[] = ["p"];	

	constructor(		
		protected settingRepository: CSettingRepository,		
		protected appService: CAppService,		
		protected router: Router,		
	) {
		super(settingRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {		
			this.appService.setTitle(`${this.thelang.words["settings-head"]} - ${this.thelang.words["common-create"]}`); 	
			this.x = new CSetting().init();			
			this.appService.monitorLog("[settings create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.p = null;

		if (!this.x.p) {
			this.errors.p = "common-error-required";
			error = true;
		}

		return !error;
	}
}
