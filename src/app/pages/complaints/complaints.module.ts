import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CComplaintsListPage } from './pages/list/complaints.list.page';
import { CComplaintsEditPage } from './pages/edit/complaints.edit.page';
import { CComplaintComponent } from './components/complaint/complaint.component';
import { CComplaintsListService } from './services/complaints.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CComplaintsListPage, pathMatch: "full"},
	{path:"edit/:id", component: CComplaintsEditPage},
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
		CComplaintsListPage,
		CComplaintsEditPage,
		CComplaintComponent,
	],  
	providers: [
		CComplaintsListService,
	]  
})
export class CComplaintsModule { }
