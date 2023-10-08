import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CBansListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {
        user_id: undefined,
        banned_id: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.user_id !== undefined || this.filter.banned_id !== undefined;
    }

    public filterReset(): void {
        this.filter = {            
            user_id: undefined,
            banned_id: undefined,
        };
    } 
}
