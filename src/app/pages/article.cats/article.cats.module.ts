import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CArticleCatsListPage } from './pages/list/article.cats.list.page';
import { CArticleCatsCreatePage } from './pages/create/article.cats.create.page';
import { CArticleCatsEditPage } from './pages/edit/article.cats.edit.page';
import { CArticleCatComponent } from './components/article.cat/article.cat.component';
import { CArticleCatsListService } from './services/article.cats.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CArticleCatsListPage, pathMatch: "full"},
	{path:"create", component: CArticleCatsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CArticleCatsEditPage},
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
		CArticleCatsListPage,
		CArticleCatsCreatePage,
		CArticleCatsEditPage,
		CArticleCatComponent,
	],  
	providers: [
		CArticleCatsListService,
	]  
})
export class CArticleCatsModule { }
