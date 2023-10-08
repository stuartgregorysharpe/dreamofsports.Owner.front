import { AfterViewInit, Component, Directive } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { IThelang } from "src/app/model/entities/thelang";
import { Timeout } from "../../decorators/timeout";
import { CAppService } from "../../services/app.service";

@Component({
    selector: "sidebar-menu",
    templateUrl: "sidebar-menu.component.html",
    styleUrls: ["sidebar-menu.component.scss"],
})
export class CSidebarMenuComponent implements AfterViewInit {
    public subActive = {localization: false, articles: false, catalogue: false, finances: false, moderation: false};

    constructor(
        private appService: CAppService,
        private router: Router,
    ) {}

    get thelang(): IThelang {return this.appService.thelang;} 
    get url(): string[] {return this.appService.url;}    

    public ngAfterViewInit(): void {
        document
            .querySelectorAll(".sbn-items a:not(.expandable)")
            .forEach(element => element.addEventListener("click", () => window.innerWidth < 1000 && (this.appService.sidebarActive = false)));
        this.initSub();
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.initSub());
    } 

    @Timeout(1)
    private async initSub(): Promise<void> {
        for (let field in this.subActive) {
            this.subActive[field] = this.url[1] === field;
        }
	}    
    
    public toggleSub(name: string): void {		
		this.subActive[name] = !this.subActive[name];
	}
}