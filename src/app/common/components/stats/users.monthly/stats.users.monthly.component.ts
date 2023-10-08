import { Component, OnInit } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CStatRepository } from "src/app/common/services/repositories/stat.repository";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "stats-users-monthly",
    templateUrl: "stats.users.monthly.component.html",
    styleUrls: ["../../../styles/graphs.scss"],
})
export class CStatsUsersMonthlyComponent implements OnInit {
    public users: number[] = [];
    public athlets: number[] = [];
    public firms: number[] = [];
    public years: number[] = [];
    public year: number = null;
    public months: number[] = [];
    public max: number = null;

    constructor(
        private statsRepository: CStatRepository,
        private appService: CAppService,
    ) {}

    get thelang(): IThelang {return this.appService.thelang;} 

    public ngOnInit(): void {
        this.initDates();
        this.initStats();
    }

    private initDates(): void {
        const now = new Date();
        this.year = now.getFullYear();
        this.years = this.appService.range(2022, this.year);        
        this.months = this.appService.range(1, 12);        
    }

    public async initStats(): Promise<void> {
        try {
            this.reset();
            await this.appService.pause(100);
            const data = await this.statsRepository.loadUsersMonthly(this.year);
            this.users = data.users;
            this.athlets = data.athlets;
            this.firms = data.firms;
            this.max = Math.max(...this.users);
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }

    private reset(): void {
        this.users = new Array(12).fill(0);
        this.athlets = new Array(12).fill(0);
        this.firms = new Array(12).fill(0);
    }

    public height(x: number): string {
        if (this.appService.isEmpty(x)) return "0";
        return this.max ? `${100 * x / this.max}%` : "0";
    }

    public color(index: number): string {
        return this.appService.contrastColor(index);
    }
}
