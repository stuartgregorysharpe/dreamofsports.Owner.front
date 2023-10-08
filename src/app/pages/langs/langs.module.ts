import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CLangsListPage } from './pages/list/langs.list.page';
import { CLangsCreatePage } from './pages/create/langs.create.page';
import { CLangsEditPage } from './pages/edit/langs.edit.page';
import { CLangComponent } from './components/lang/lang.component';
import { CLangsListService } from './services/langs.list.service';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';

let routing = RouterModule.forChild ([        
	{path:"", component: CLangsListPage, pathMatch: "full"},
	{path:"create", component: CLangsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CLangsEditPage},
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
		CLangsListPage,
		CLangsCreatePage,
		CLangsEditPage,
		CLangComponent,
	],  
	providers: [
		CLangsListService,
	]  
})
export class CLangsModule { }
