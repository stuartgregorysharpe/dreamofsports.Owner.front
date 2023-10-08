import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CCountriesListPage } from './pages/list/countries.list.page';
import { CCountriesCreatePage } from './pages/create/countries.create.page';
import { CCountriesEditPage } from './pages/edit/countries.edit.page';
import { CCountryComponent } from './components/country/country.component';
import { CCountriesListService } from './services/countries.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CCountriesListPage, pathMatch: "full"},
	{path:"create", component: CCountriesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CCountriesEditPage},
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
		CCountriesListPage,
		CCountriesCreatePage,
		CCountriesEditPage,
		CCountryComponent,
	],  
	providers: [
		CCountriesListService,
	]  
})
export class CCountriesModule { }
