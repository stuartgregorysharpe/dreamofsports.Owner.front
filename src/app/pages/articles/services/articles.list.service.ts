import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CArticlesListService extends CListService {
    public sortBy: string = "date";
    public sortDir: number = -1;
    public filter = {
        from: undefined,
        to: undefined,
        name: "",
        cat_id: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.from !== undefined || this.filter.to !== undefined || this.filter.name !== "" || this.filter.cat_id !== undefined;
    }

    public filterReset(): void {
        this.filter = {
            from: undefined,
            to: undefined,
            name: "",
            cat_id: undefined,
        };
    } 
}
