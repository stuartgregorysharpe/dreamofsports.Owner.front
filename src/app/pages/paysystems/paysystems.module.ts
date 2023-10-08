import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CPaysystemsListPage } from './pages/list/paysystems.list.page';
import { CPaysystemsCreatePage } from './pages/create/paysystems.create.page';
import { CPaysystemsEditPage } from './pages/edit/paysystems.edit.page';
import { CPaysystemComponent } from './components/paysystem/paysystem.component';
import { CPaysystemsListService } from './services/paysystems.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CPaysystemsListPage, pathMatch: "full"},
	{path:"create", component: CPaysystemsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CPaysystemsEditPage},
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
		CPaysystemsListPage,
		CPaysystemsCreatePage,
		CPaysystemsEditPage,
		CPaysystemComponent,
	],  
	providers: [
		CPaysystemsListService,
	]  
})
export class CPaysystemsModule { }
