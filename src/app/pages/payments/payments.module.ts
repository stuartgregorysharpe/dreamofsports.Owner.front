import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CPaymentsListPage } from './pages/list/payments.list.page';
import { CPaymentsEditPage } from './pages/edit/payments.edit.page';
import { CPaymentComponent } from './components/payment/payment.component';
import { CPaymentsListService } from './services/payments.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CPaymentsListPage, pathMatch: "full"},
	{path:"edit/:id", component: CPaymentsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CComponentsModule,
		CDirectivesModule,
		routing,
	],
	declarations: [
		CPaymentsListPage,
		CPaymentsEditPage,
		CPaymentComponent,
	],  
	providers: [
		CPaymentsListService,
	]  
})
export class CPaymentsModule { }
