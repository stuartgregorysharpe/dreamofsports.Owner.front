import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CCatsCreatePage } from './pages/create/cats.create.page';
import { CCatsEditPage } from './pages/edit/cats.edit.page';
import { CCatComponent } from './components/cat/cat.component';
import { CCatsListService } from './services/cats.list.service';
import { CCatsListPage } from './pages/list/cats.list.page';

let routing = RouterModule.forChild ([        
	{path:"", component: CCatsListPage, pathMatch: "full"},
	{path:"create", component: CCatsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CCatsEditPage},
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
		CCatsListPage,
		CCatsCreatePage,
		CCatsEditPage,
		CCatComponent,
	],
	providers: [
		CCatsListService,
	]   
})
export class CCatsModule { }
