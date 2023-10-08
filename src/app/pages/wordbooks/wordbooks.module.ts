import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CWordbooksListPage } from './pages/list/wordbooks.list.page';
import { CWordbooksCreatePage } from './pages/create/wordbooks.create.page';
import { CWordbooksEditPage } from './pages/edit/wordbooks.edit.page';
import { CWordbookComponent } from './components/wordbook/wordbook.component';
import { CWordbooksListService } from './services/wordbooks.list.service';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';

let routing = RouterModule.forChild ([        
	{path:"", component: CWordbooksListPage, pathMatch: "full"},
	{path:"create", component: CWordbooksCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CWordbooksEditPage},
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
		CWordbooksListPage,
		CWordbooksCreatePage,
		CWordbooksEditPage,
		CWordbookComponent,
	],  
	providers: [
		CWordbooksListService,
	]  
})
export class CWordbooksModule { }
