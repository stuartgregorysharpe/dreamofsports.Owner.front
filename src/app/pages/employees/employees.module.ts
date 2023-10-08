import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CEmployeesListPage } from './pages/list/employees.list.page';
import { CEmployeesCreatePage } from './pages/create/employees.create.page';
import { CEmployeesEditPage } from './pages/edit/employees.edit.page';
import { CEmployeeComponent } from './components/employee/employee.component';
import { CEmployeesListService } from './services/employees.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CEmployeesListPage, pathMatch: "full"},
	{path:"create", component: CEmployeesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CEmployeesEditPage},
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
		CEmployeesListPage,
		CEmployeesCreatePage,
		CEmployeesEditPage,
		CEmployeeComponent,
	],  
	providers: [
		CEmployeesListService,
	]  
})
export class CEmployeesModule { }
