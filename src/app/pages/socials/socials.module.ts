import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CSocialsListPage } from './pages/list/socials.list.page';
import { CSocialsCreatePage } from './pages/create/socials.create.page';
import { CSocialsEditPage } from './pages/edit/socials.edit.page';
import { CSocialComponent } from './components/social/social.component';
import { CSocialsListService } from './services/socials.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CSocialsListPage, pathMatch: "full"},
	{path:"create", component: CSocialsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CSocialsEditPage},
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
		CSocialsListPage,
		CSocialsCreatePage,
		CSocialsEditPage,
		CSocialComponent,
	],  
	providers: [
		CSocialsListService,
	]  
})
export class CSocialsModule { }
