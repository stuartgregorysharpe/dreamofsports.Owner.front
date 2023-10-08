import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/common/components/components.module';
import { CDirectivesModule } from 'src/app/common/directives/directives.module';
import { CFavoritesListPage } from './pages/list/favorites.list.page';
import { CFavoritesCreatePage } from './pages/create/favorites.create.page';
import { CFavoritesListService } from './services/favorites.list.service';
import { CFavoriteComponent } from './components/favorite/favorite.component';

let routing = RouterModule.forChild ([        
	{path:"", component: CFavoritesListPage, pathMatch: "full"},
	{path:"create", component: CFavoritesCreatePage, pathMatch: "full"},
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
		CFavoritesListPage,
		CFavoritesCreatePage,
		CFavoriteComponent,
	],  
	providers: [
		CFavoritesListService,
	]  
})
export class CFavoritesModule { }
