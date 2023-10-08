import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CTariffsListPage } from './pages/list/tariffs.list.page';
import { CTariffsCreatePage } from './pages/create/tariffs.create.page';
import { CTariffsEditPage } from './pages/edit/tariffs.edit.page';
import { CTariffComponent } from './components/tariff/tariff.component';
import { CTariffsListService } from './services/tariffs.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CTariffsListPage, pathMatch: "full"},
	{path:"create", component: CTariffsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CTariffsEditPage},
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
		CTariffsListPage,
		CTariffsCreatePage,
		CTariffsEditPage,
		CTariffComponent,
	],  
	providers: [
		CTariffsListService,
	]  
})
export class CTariffsModule { }
