import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CMessagesListPage } from './pages/list/messages.list.page';
import { CMessagesEditPage } from './pages/edit/messages.edit.page';
import { CMessageComponent } from './components/message/message.component';
import { CMessagesListService } from './services/messages.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CMessagesListPage, pathMatch: "full"},
	{path:"edit/:id", component: CMessagesEditPage},
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
		CMessagesListPage,
		CMessagesEditPage,
		CMessageComponent,
	],  
	providers: [
		CMessagesListService,
	]  
})
export class CMessagesModule { }
