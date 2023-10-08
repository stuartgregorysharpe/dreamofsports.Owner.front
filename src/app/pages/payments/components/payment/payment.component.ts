import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CPayment } from 'src/app/model/entities/payment';

@Component({
    selector: "the-payment",
    templateUrl: "./payment.component.html",
})
export class CPaymentComponent extends CEntityComponent<CPayment> {}
