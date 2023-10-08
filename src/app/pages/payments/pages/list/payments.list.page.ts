import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CPayment } from 'src/app/model/entities/payment';
import { CAppService } from 'src/app/common/services/app.service';
import { CPaymentsListService } from '../../services/payments.list.service';
import { CPaymentRepository } from 'src/app/common/services/repositories/payment.repository';

@Component({
	selector: 'payments-list-page',
	templateUrl: './payments.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CPaymentsListPage extends CListPage<CPayment> implements OnInit {    
    public homeUrl: string = "/finances/payments";  
    
    constructor(        
        protected paymentRepository: CPaymentRepository, 
        protected appService: CAppService,        
        protected listService: CPaymentsListService,  
    ) 
    {      
        super(paymentRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["payments-head"]); 
            await this.initList();  
            this.appService.monitorLog("[payments] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

