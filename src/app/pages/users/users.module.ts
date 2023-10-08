import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CUsersListPage } from './pages/list/users.list.page';
import { CUsersCreatePage } from './pages/create/users.create.page';
import { CUsersEditPage } from './pages/edit/users.edit.page';
import { CUserComponent } from './components/user/user.component';
import { CUsersListService } from './services/users.list.service';
import { CResumeAthletComponent } from './components/resume/resume-athlet/resume-athlet.component';
import { CResumeFirmComponent } from './components/resume/resume-firm/resume-firm.component';

let routing = RouterModule.forChild ([        
	{path:"", component: CUsersListPage, pathMatch: "full"},
	{path:"create", component: CUsersCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CUsersEditPage},
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
		CUsersListPage,
		CUsersCreatePage,
		CUsersEditPage,
		CUserComponent,
		CResumeAthletComponent,
		CResumeFirmComponent,
	],  
	providers: [
		CUsersListService,
	]  
})
export class CUsersModule { }
