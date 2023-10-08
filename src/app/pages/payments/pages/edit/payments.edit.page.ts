import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CPayment } from 'src/app/model/entities/payment';
import { CAppService } from 'src/app/common/services/app.service';
import { CPaymentRepository } from 'src/app/common/services/repositories/payment.repository';

@Component({
	selector: 'payments-edit-page',
	templateUrl: './payments.edit.page.html',	
	styleUrls: [
		"../../../../common/styles/forms.scss",
		"../../../../common/styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CPaymentsEditPage extends CEntityPage<CPayment> implements OnInit {		
	public homeUrl: string = "/finances/payments";
	public requiredFields: string[] = [];	

	constructor(		
		protected paymentRepository: CPaymentRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
	) 
	{
		super(paymentRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["payments-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.paymentRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[payments edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		return true; // dummy
	}
}
