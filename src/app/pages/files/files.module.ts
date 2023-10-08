import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CFilesListPage } from './pages/list/files.list.page';
import { CFilesCreatePage } from './pages/create/files.create.page';
import { CFilesEditPage } from './pages/edit/files.edit.page';
import { CFileComponent } from './components/file/file.component';
import { CFilesListService } from './services/files.list.service';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';

let routing = RouterModule.forChild ([        
	{path:"", component: CFilesListPage, pathMatch: "full"},
	{path:"create", component: CFilesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CFilesEditPage},
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
		CFilesListPage,
		CFilesCreatePage,
		CFilesEditPage,
		CFileComponent,
	],  
	providers: [
		CFilesListService,
	]  
})
export class CFilesModule { }
