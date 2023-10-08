import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CBackupsListPage } from './pages/list/backups.list.page';
import { BackupsListService } from './services/backups.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CBackupsListPage, pathMatch: "full"},
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
		CBackupsListPage,
	],  
	providers: [
		BackupsListService,
	]  
})
export class CBackupsModule { }
