import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CTariff } from 'src/app/model/entities/tariff';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CTariffRepository } from 'src/app/common/services/repositories/tariff.repository';

@Component({
	selector: 'tariffs-edit-page',
	templateUrl: './tariffs.edit.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CTariffsEditPage extends CEntityPage<CTariff> implements OnInit {		
	public homeUrl: string = "/finances/tariffs";
	public requiredFields: string[] = ["name"];	
	public ll: CLang[] = [];

	constructor(		
		protected tariffRepository: CTariffRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
		private langRepository: CLangRepository,
	) 
	{
		super(tariffRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["tariffs-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.tariffRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[tariffs edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;

		for (let t of this.x.translations) {
			if (!t.name) {
				this.errors.name = "common-error-required-ml";
				error = true;
			}
		}		

		return !error;
	}
}
