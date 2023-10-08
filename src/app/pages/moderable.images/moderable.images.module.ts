import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CModerableImagesListPage } from './pages/list/moderable.images.list.page';
import { CModerableImagesListService } from './services/moderable.images.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CModerableImagesListPage, pathMatch: "full"},
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
		CModerableImagesListPage,
	],  
	providers: [
		CModerableImagesListService,
	]  
})
export class CModerableImagesModule { }
