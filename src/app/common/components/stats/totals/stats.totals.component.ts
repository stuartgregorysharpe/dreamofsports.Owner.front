import { Component, Input, OnInit } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CStatRepository } from "src/app/common/services/repositories/stat.repository";
import { IStatTotals } from "src/app/model/entities/stats/stat.totals.interface";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "stats-totals",
    templateUrl: "stats.totals.component.html",
    styleUrls: ["stats.totals.component.scss"],
})
export class CStatsTotalsComponent implements OnInit {
    @Input() showAmount: boolean = true;
    public data: IStatTotals = {users: 0, athlets: 0, firms: 0, payments_q: 0, payments_amount: 0};

    constructor(
        private statsRepository: CStatRepository,
        private appService: CAppService,
    ) {}

    get thelang(): IThelang {return this.appService.thelang;}     

    public ngOnInit(): void {
        this.initStats();
    }

    private async initStats(): Promise<void> {
        try {
            this.data = await this.statsRepository.loadTotals();
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}