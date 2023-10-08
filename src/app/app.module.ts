import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CAppRoutingModule } from './app-routing.module';
import { CAppComponent } from './app.component';
import { CAppRouteReuseStrategy } from './app.routereusestrategy';
import { CComponentsModule } from './common/components/components.module';
import { CServicesModule } from './common/services/services.module';
import { CHomeModule } from './pages/home/home.module';

@NgModule({
	bootstrap: [CAppComponent],
	declarations: [CAppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		CAppRoutingModule,
		CServicesModule,				
		CHomeModule,
		CComponentsModule,
	],
	providers: [
		{provide: RouteReuseStrategy, useClass: CAppRouteReuseStrategy},
	],		
})
export class CAppModule { }
