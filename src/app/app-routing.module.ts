import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CAuthGuard } from './common/services/guards/auth.guard';
import { CAdminsModule } from './pages/admins/admins.module';
import { CAuthModule } from './pages/auth/auth.module';
import { CBackupsModule } from './pages/backups/backups.module';
import { CHomePage } from './pages/home/home.page';
import { CLangsModule } from './pages/langs/langs.module';
import { CMailtemplatesModule } from './pages/mailtemplates/mailtemplates.module';
import { COptionsModule } from './pages/options/options.module';
import { CPagesModule } from './pages/pages/pages.module';
import { CSettingsModule } from './pages/settings/settings.module';
import { CFilesModule } from './pages/files/files.module';
import { CWordbooksModule } from './pages/wordbooks/wordbooks.module';
import { CEmployeesModule } from './pages/employees/employees.module';
import { CMessagesModule } from './pages/messages/messages.module';
import { CArticlesModule } from './pages/articles/articles.module';
import { CArticleCatsModule } from './pages/article.cats/article.cats.module';
import { CCountriesModule } from './pages/countries/countries.module';
import { CCatsModule } from './pages/cats/cats.module';
import { CSocialsModule } from './pages/socials/socials.module';
import { CFavoritesModule } from './pages/favorites/favorites.module';
import { CBansModule } from './pages/bans/bans.module';
import { CUsersModule } from './pages/users/users.module';
import { CTariffsModule } from './pages/tariffs/tariffs.module';
import { CPaysystemsModule } from './pages/paysystems/paysystems.module';
import { CPaymentsModule } from './pages/payments/payments.module';
import { CComplaintsModule } from './pages/complaints/complaints.module';
import { CModerableImagesModule } from './pages/moderable.images/moderable.images.module';

const routes: Routes = [
	{path: "", component: CHomePage, canActivate: [CAuthGuard]},
	{path: "auth", loadChildren: () => CAuthModule}, 
	{path: "options", loadChildren: () => COptionsModule, canActivate: [CAuthGuard]}, 		
	{path: "settings", loadChildren: () => CSettingsModule, canActivate: [CAuthGuard]}, 
	{path: "admins", loadChildren: () => CAdminsModule, canActivate: [CAuthGuard]}, 		
	{path: "localization/langs", loadChildren: () => CLangsModule, canActivate: [CAuthGuard]}, 	
	{path: "localization/wordbooks", loadChildren: () => CWordbooksModule, canActivate: [CAuthGuard]},
	{path: "localization/countries", loadChildren: () => CCountriesModule, canActivate: [CAuthGuard]},
	{path: "files", loadChildren: () => CFilesModule, canActivate: [CAuthGuard]}, 
	{path: "pages", loadChildren: () => CPagesModule, canActivate: [CAuthGuard]}, 	
	{path: "articles/articles", loadChildren: () => CArticlesModule, canActivate: [CAuthGuard]}, 
	{path: "articles/cats", loadChildren: () => CArticleCatsModule, canActivate: [CAuthGuard]}, 	
	{path: "employees", loadChildren: () => CEmployeesModule, canActivate: [CAuthGuard]}, 
	{path: "catalogue/cats", loadChildren: () => CCatsModule, canActivate: [CAuthGuard]}, 	
	{path: "catalogue/users", loadChildren: () => CUsersModule, canActivate: [CAuthGuard]}, 	
	{path: "catalogue/socials", loadChildren: () => CSocialsModule, canActivate: [CAuthGuard]}, 	
	{path: "catalogue/favorites", loadChildren: () => CFavoritesModule, canActivate: [CAuthGuard]}, 	
	{path: "catalogue/bans", loadChildren: () => CBansModule, canActivate: [CAuthGuard]}, 	
	{path: "finances/tariffs", loadChildren: () => CTariffsModule, canActivate: [CAuthGuard]}, 	
	{path: "finances/paysystems", loadChildren: () => CPaysystemsModule, canActivate: [CAuthGuard]}, 	
	{path: "finances/payments", loadChildren: () => CPaymentsModule, canActivate: [CAuthGuard]}, 	
	{path: "messages", loadChildren: () => CMessagesModule, canActivate: [CAuthGuard]}, 	
	{path: "backups", loadChildren: () => CBackupsModule, canActivate: [CAuthGuard]}, 
	{path: "mailtemplates", loadChildren: () => CMailtemplatesModule, canActivate: [CAuthGuard]}, 	
	{path: "moderation/complaints", loadChildren: () => CComplaintsModule, canActivate: [CAuthGuard]}, 	
	{path: "moderation/moderable-images", loadChildren: () => CModerableImagesModule, canActivate: [CAuthGuard]}, 	
	{path: "**", redirectTo: "/"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class CAppRoutingModule { }
