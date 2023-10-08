import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CPagesListPage } from './pages/list/pages.list.page';
import { CPagesCreatePage } from './pages/create/pages.create.page';
import { CPagesEditPage } from './pages/edit/pages.edit.page';
import { CPageComponent } from './components/page/page.component';
import { CPagesListService } from './services/pages.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CPagesListPage, pathMatch: "full"},
	{path:"create", component: CPagesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CPagesEditPage},
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
		CPagesListPage,
		CPagesCreatePage,
		CPagesEditPage,
		CPageComponent,
	],
	providers: [
		CPagesListService,
	]   
})
export class CPagesModule { }
