import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CComponentsModule } from "src/app/common/components/components.module";
import { CDirectivesModule } from "src/app/common/directives/directives.module";
import { CLoginAuthPage } from "./login/login.auth.page";
import { CLogoutAuthPage } from "./logout/logout.auth.page";
import { CRecoverAuthPage } from "./recover/recover.auth.page";

let routes = RouterModule.forChild ([            
	{path: "login", component: CLoginAuthPage, pathMatch: "full"},
	{path: "logout", component: CLogoutAuthPage, pathMatch: "full"},	
	{path: "recover", component: CRecoverAuthPage, pathMatch: "full"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,        
		CComponentsModule,
		CDirectivesModule,
		routes,
	],
	declarations: [
		CLoginAuthPage,	
		CLogoutAuthPage,		
		CRecoverAuthPage,
	],    		    
})
export class CAuthModule {}