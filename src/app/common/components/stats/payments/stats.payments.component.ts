import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Timeout } from "src/app/common/decorators/timeout";
import { CAppService } from "src/app/common/services/app.service";
import { CStatRepository } from "src/app/common/services/repositories/stat.repository";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "stats-payments",
    templateUrl: "stats.payments.component.html",
    styleUrls: ["../../../styles/graphs.scss"],
})
export class CStatsPaymentsComponent implements OnInit, AfterViewInit {
    @ViewChild("animation", {static: false}) animationRef: ElementRef; 
    public data: number[] = [];
    public years: number[] = [];
    public year: number = null;
    public months: number[] = [];
    public max: number = null;
    public linePoints: string = "";
    public prevPoints: string = ""; // предыдущие точки для анимации
    public areaPoints: string = ""; // точки области для градиента (присоединяется начальная и 2 конечные для получения замк. контура)
    private step: number = 100 / 11;
    public rebuilding: boolean = false;

    constructor(
        private statsRepository: CStatRepository,
        private appService: CAppService,
    ) {}

    get thelang(): IThelang {return this.appService.thelang;}     
    get animation(): SVGAnimationElement {return this.animationRef?.nativeElement;}

    public ngOnInit(): void {
        this.initDates();
        this.initGraph();
    }

    @Timeout(1)
    public ngAfterViewInit(): void {
        this.initStats();
    }

    private initDates(): void {
        const now = new Date();
        this.year = now.getFullYear();
        this.years = this.appService.range(2022, this.year);        
        this.months = this.appService.range(1, 12);        
    }

    private initGraph(): void {
        this.linePoints = "";
        this.prevPoints = "";
        this.areaPoints = "0,100 ";

        for (let x = 0; x < 12; x++) {
            this.linePoints += `${x * this.step},100 `;
            this.prevPoints += `${x * this.step},100 `;
            this.areaPoints += `${x * this.step},100 `;
        }

        this.areaPoints += "100,100 0,100";
    }

    public async initStats(): Promise<void> {
        try {              
            this.data = await this.statsRepository.loadPaymentsMonthly(this.year);
            this.max = Math.max(...this.data);
            this.rebuilding = true;          
            this.buildGraph();
            await this.appService.pause(300); // end animation, then show gradient
            this.rebuilding = false;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }

    private buildGraph(): void {
        this.prevPoints = this.linePoints;
        this.linePoints = "";
        this.areaPoints = "0,100 ";

        for (let x = 0; x < 12; x++) {
            this.linePoints += `${x*this.step},${100-this.value2percent(this.data[x])} `;
            this.areaPoints += `${x*this.step},${100-this.value2percent(this.data[x])} `;
        }

        this.areaPoints += "100,100 0,100";
        this.animation?.beginElement();
    }    

    public color(index: number): string {
        return this.appService.contrastColor(index);
    }

    public value2percent(x: number): number {
        return this.max ? 100 * x / this.max : 0;
    }
}
