import { Directive, ElementRef, HostListener, ViewChild } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { IThelang } from "src/app/model/entities/thelang";

@Directive()
export abstract class CMenubtnComponent {
    @ViewChild("btnelement", {static: false}) btnElementRef: ElementRef;     

    public active: boolean = false;   
    public menuWidth: number = 150; 
    public menuHeight: number = 2 * 40 + 10;
    public menuTop: number = 0;
    public menuLeft: number = 0;

    constructor(protected appService: CAppService) {}
    
    get thelang(): IThelang {return this.appService.thelang;}  
    get btnElement(): HTMLElement {return this.btnElementRef.nativeElement;}   
    
    public onActivate(): void {
        const btnRight = this.btnElement.getBoundingClientRect().right;  
        const btnTop = this.btnElement.getBoundingClientRect().top;   
        const btnBottom = this.btnElement.getBoundingClientRect().bottom;        
        this.menuLeft = btnRight - this.menuWidth;     
        this.menuTop = (btnBottom + this.menuHeight + 5 > window.innerHeight && btnTop - this.menuHeight - 5 > window.innerHeight - (btnBottom + this.menuHeight + 5)) ? 
            btnTop - this.menuHeight - 5 : 
            btnBottom + 5;               
        this.active = true;
    }

    public close(): void {
        this.active = false;
    }

    @HostListener('window:resize')
    public onResize(): void {        
        this.active && this.close();
    }    
}