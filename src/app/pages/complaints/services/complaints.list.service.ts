import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CComplaintsListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {
        from: undefined,
        to: undefined,
        author_id: undefined,
        breaker_id: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.from !== undefined || this.filter.to !== undefined || this.filter.author_id !== undefined || this.filter.breaker_id !== undefined;
    }

    public filterReset(): void {
        this.filter = { 
            from: undefined,
            to: undefined,           
            author_id: undefined,
            breaker_id: undefined,
        };
    } 
}
