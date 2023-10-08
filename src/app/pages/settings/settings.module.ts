import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CSettingsListPage } from './pages/list/settings.list.page';
import { CSettingsCreatePage } from './pages/create/settings.create.page';
import { CSettingComponent } from './components/setting/setting.component';
import { CSettingsListService } from './services/settings.list.service';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';

let routing = RouterModule.forChild ([        
	{path:"", component: CSettingsListPage, pathMatch: "full"},
	{path:"create", component: CSettingsCreatePage, pathMatch: "full"},	
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
		CSettingsListPage,
		CSettingsCreatePage,		
		CSettingComponent,
	],  
	providers: [
		CSettingsListService,
	]  
})
export class CSettingsModule { }
