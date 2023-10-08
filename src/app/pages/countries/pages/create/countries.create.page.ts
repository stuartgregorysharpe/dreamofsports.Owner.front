import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CCountry } from 'src/app/model/entities/country';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CCountryRepository } from 'src/app/common/services/repositories/country.repository';

@Component({
	selector: 'countries-create-page',
	templateUrl: './countries.create.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CCountriesCreatePage extends CEntityPage<CCountry> implements OnInit {		
	public homeUrl: string = "/localization/countries";
	public requiredFields: string[] = ["name", "code"];	
	public ll: CLang[] = [];

	constructor(		
		protected countryRepository: CCountryRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		private langRepository: CLangRepository,     
	) 
	{
		super(countryRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["countries-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CCountry().init(this.ll);	
			this.appService.monitorLog("[countries create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.code = null;
		this.errors.name = null;

		if (!this.x.code) {
			this.errors.code = "common-error-required";
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

