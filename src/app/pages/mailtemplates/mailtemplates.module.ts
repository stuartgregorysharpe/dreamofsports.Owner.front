import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CMailtemplatesListPage } from './pages/list/mailtemplates.list.page';
import { CMailtemplatesCreatePage } from './pages/create/mailtemplates.create.page';
import { CMailtemplatesEditPage } from './pages/edit/mailtemplates.edit.page';
import { CMailtemplateComponent } from './components/mailtemplate/mailtemplate.component';
import { CMailtemplatesListService } from './services/mailtemplates.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CMailtemplatesListPage, pathMatch: "full"},
	{path:"create", component: CMailtemplatesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CMailtemplatesEditPage},
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
		CMailtemplatesListPage,
		CMailtemplatesCreatePage,
		CMailtemplatesEditPage,
		CMailtemplateComponent,
	],  
	providers: [
		CMailtemplatesListService,
	]  
})
export class CMailtemplatesModule { }
