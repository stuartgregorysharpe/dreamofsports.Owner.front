import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CEmployee } from 'src/app/model/entities/employee';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CEmployeeRepository } from 'src/app/common/services/repositories/employee.repository';

@Component({
	selector: 'employees-create-page',
	templateUrl: './employees.create.page.html',	
	styleUrls: ["../../../../common/styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CEmployeesCreatePage extends CEntityPage<CEmployee> implements OnInit {		
	public homeUrl: string = "/employees";
	public requiredFields: string[] = ["name", "post", "img"];	
	public ll: CLang[] = [];

	constructor(		
		protected employeeRepository: CEmployeeRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		private langRepository: CLangRepository,     
	) 
	{
		super(employeeRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["employees-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CEmployee().init(this.ll);	
			this.appService.monitorLog("[employees create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.img = null;
		this.errors.name = null;
		this.errors.post = null;

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

		for (let t of this.x.translations) {
			if (!t.post) {
				this.errors.post = "common-error-required-ml";
				error = true;
			}
		}

		return !error;
	}
}

