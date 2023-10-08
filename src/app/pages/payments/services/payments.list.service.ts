import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CPaymentsListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {
        from: undefined,
        to: undefined,
        user_email: "",
    };

    public filterChanged(): boolean {
        return this.filter.from !== undefined || this.filter.to !== undefined || this.filter.user_email !== "";
    }

    public filterReset(): void {
        this.filter = {
            from: undefined,
            to: undefined,
            user_email: "",
        };
    } 
}
