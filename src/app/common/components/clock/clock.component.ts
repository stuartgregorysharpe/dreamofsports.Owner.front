import { Component, OnDestroy, OnInit } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";

@Component({
    selector: "the-clock",
    templateUrl: "clock.component.html",
    styleUrls: ["clock.component.scss"],
})
export class CClockComponent implements OnInit, OnDestroy {
    private interval: number = null;
    public time: string = ""; 
    
    constructor(private appService: CAppService) {}

    public ngOnInit(): void {
        this.interval = window.setInterval(() => {
			let date: Date = new Date();
			this.time = `${this.appService.twoDigits(date.getHours())}:${this.appService.twoDigits(date.getMinutes())}:${this.appService.twoDigits(date.getSeconds())}`;
		}, 1000);
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.interval);
    }
}