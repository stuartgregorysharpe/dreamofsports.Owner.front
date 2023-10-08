import { Component, OnInit } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CStatRepository } from "src/app/common/services/repositories/stat.repository";
import { IStatCat } from "src/app/model/entities/stats/stat.cats.interface";
import { IThelang } from "src/app/model/entities/thelang";

@Component({
    selector: "stats-cats",
    templateUrl: "stats.cats.component.html",
    styleUrls: ["../../../styles/graphs.scss"],
})
export class CStatsCatsComponent implements OnInit {
    public cats: IStatCat[] = [];
    public total: number = 0;
    public radius: number = 50;
    public ready: boolean = false;

    constructor(
        private statsRepository: CStatRepository,
        private appService: CAppService,
    ) {}

    get thelang(): IThelang {return this.appService.thelang;} 

    public ngOnInit(): void {
        this.initStats();
    }

    public async initStats(): Promise<void> {
        try {
            const data = await this.statsRepository.loadCats();
            this.cats = data.cats;
            this.total = data.total;
            await this.appService.pause(500);
            this.ready = true; // just for effect :-)
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }

    public color(index: number): string {
        return this.appService.contrastColor(index);
    }    

    public sector(index: number): string {
        let offset = 0;

        for (let i = 0; i < index; i++) {
            offset += this.cats[i].percent;
        }

        const startAngle = 2 * Math.PI * offset / 100;
        const endAngle = startAngle + 2 * Math.PI * this.cats[index].percent / 100;
        const center = {x: this.radius, y: this.radius};
        const start = this.appService.polarToCartesian(center, this.radius, endAngle);
        const end = this.appService.polarToCartesian(center, this.radius, startAngle);    
        const largeFlag = endAngle - startAngle <= Math.PI ? "0" : "1";  
        const d = `M ${start.x} ${start.y} A ${this.radius} ${this.radius} 0 ${largeFlag} 0 ${end.x} ${end.y} L ${center.x} ${center.y} L ${start.x} ${start.y}`;
        return d;
    }    
}