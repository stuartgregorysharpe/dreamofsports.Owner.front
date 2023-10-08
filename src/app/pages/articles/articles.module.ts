import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CArticlesListPage } from './pages/list/articles.list.page';
import { CArticlesCreatePage } from './pages/create/articles.create.page';
import { CArticlesEditPage } from './pages/edit/articles.edit.page';
import { CArticleComponent } from './components/article/article.component';
import { CArticlesListService } from './services/articles.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CArticlesListPage, pathMatch: "full"},
	{path:"create", component: CArticlesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CArticlesEditPage},
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
		CArticlesListPage,
		CArticlesCreatePage,
		CArticlesEditPage,
		CArticleComponent,
	],  
	providers: [
		CArticlesListService,
	]  
})
export class CArticlesModule { }
