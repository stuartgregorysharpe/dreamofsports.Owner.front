import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { CAppService } from "src/app/common/services/app.service";

@Component({
    selector: "the-monitor",
    templateUrl: "monitor.component.html",
    styleUrls: ["monitor.component.scss"],
})
export class CMonitorComponent implements OnInit, OnDestroy {
    @ViewChild("monitor", {static: false}) private monitorRef: ElementRef;
    private subscription: Subscription = null;
    
    constructor(private appService: CAppService) {}

    get monitor(): HTMLElement {return this.monitorRef?.nativeElement;}
    get monitorContent(): BehaviorSubject<string> {return this.appService.monitorContent;}
    get monitorString(): string {return this.monitorContent.value;}

    public ngOnInit(): void {
        this.subscription = this.monitorContent.subscribe(() => this.monitor && this.appService.smoothScroll(this.monitor.scrollTop, this.monitor.scrollHeight, 300, this.monitor));
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}