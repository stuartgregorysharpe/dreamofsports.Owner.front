import { Injectable } from "@angular/core";
import { CDataService } from "../data.service";
import { IStatUsersMonthly } from "src/app/model/entities/stats/stat.users.monthly.interface";
import { IStatCats } from "src/app/model/entities/stats/stat.cats.interface";
import { IStatTotals } from "src/app/model/entities/stats/stat.totals.interface";

@Injectable()
export class CStatRepository {
    constructor(protected dataService: CDataService) {}  

    public loadUsersMonthly(year: number): Promise<IStatUsersMonthly> {
        return new Promise((resolve, reject) => 
            this.dataService
                .statsUsersMonthly(year)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }  

    public loadCats(): Promise<IStatCats> {
        return new Promise((resolve, reject) => 
            this.dataService
                .statsCats()
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadPaymentsMonthly(year: number): Promise<number[]> {
        return new Promise((resolve, reject) => 
            this.dataService
                .statsPaymentsMonthly(year)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }  

    public loadTotals(): Promise<IStatTotals> {
        return new Promise((resolve, reject) => 
            this.dataService
                .statsTotals()
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
