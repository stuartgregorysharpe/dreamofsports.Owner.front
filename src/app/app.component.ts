import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CAppService } from './common/services/app.service';
import { CThelangRepository } from './common/services/repositories/thelang.repository';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CAppComponent implements OnInit, AfterViewInit {	
	@ViewChild("win", {static: false}) winRef: ElementRef; 

	private dataReady: boolean = false;
	
	constructor(
		private appService: CAppService,		
		private thelangRepository: CThelangRepository,		
		private router: Router,		
	) {}
	
	get ready(): boolean {return this.dataReady;}	
	get authenticated(): boolean {return this.appService.url[1] !== "auth";}

	public async ngOnInit(): Promise<void> {
		await this.initAppService();		
		this.dataReady = true;
		this.removePreloader();
	}

	public async ngAfterViewInit(): Promise<void> {	
		this.appService.sidebarActive = window.innerWidth > 1000;
		this.appService.win = await this.initWin();
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => this.appService.win.scrollTop ? setTimeout(() => {this.appService.win.scrollTo(0, 0);}, 1) : null);
	}

	private initWin(): Promise<HTMLElement> {
		return new Promise((resolve, reject) => {
			const getWin = () => this.winRef?.nativeElement ? resolve(this.winRef.nativeElement) : setTimeout(() => getWin(), 50);
			getWin();
		});
	}	

	private async initAppService(): Promise<void> {
		try {
			const thelangs = await this.thelangRepository.loadAll();			
			this.appService.init(thelangs);
		} catch (err) {
			console.log(err);
		}		
	}	

	private removePreloader(): void {
		document.getElementById("preloader").classList.remove("active");
	}

	@HostListener("window:resize")
	private onResize(): void {
		this.appService.sidebarActive = window.innerWidth >= 1000;
	}
}
