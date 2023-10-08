import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CAdminsListPage } from './pages/list/admins.list.page';
import { CAdminsCreatePage } from './pages/create/admins.create.page';
import { CAdminsEditPage } from './pages/edit/admins.edit.page';
import { CAdminComponent } from './components/admin/admin.component';
import { CAdminsListService } from './services/admins.list.service';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';

let routing = RouterModule.forChild ([        
	{path:"", component: CAdminsListPage, pathMatch: "full"}, 
	{path:"create", component: CAdminsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CAdminsEditPage},
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
		CAdminsListPage,
		CAdminsCreatePage,
		CAdminsEditPage,
		CAdminComponent,
	],  
	providers: [
		CAdminsListService,
	]  
})
export class CAdminsModule { }
