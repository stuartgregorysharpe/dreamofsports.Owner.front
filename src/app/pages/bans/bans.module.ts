import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CBansListPage } from './pages/list/bans.list.page';
import { CBansCreatePage } from './pages/create/bans.create.page';
import { CBansListService } from './services/bans.list.service';
import { CBanComponent } from './components/ban/ban.component';

let routing = RouterModule.forChild ([        
	{path:"", component: CBansListPage, pathMatch: "full"},
	{path:"create", component: CBansCreatePage, pathMatch: "full"},
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
		CBansListPage,
		CBansCreatePage,
		CBanComponent,
	],  
	providers: [
		CBansListService,
	]  
})
export class CBansModule { }
