import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { COptionsPage } from './options.page';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';

let routing = RouterModule.forChild ([        
	{path:"", component: COptionsPage, pathMatch: "full"},	
]);

@NgModule({	
    imports: [	
		routing,
		FormsModule,
		CommonModule,
		CComponentsModule,
		CDirectivesModule,
	],
	declarations: [
		COptionsPage,
	],    
})
export class COptionsModule { }
