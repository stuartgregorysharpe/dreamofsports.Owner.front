import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CUsersListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {
        type: undefined,
        email: "",
        id: null,
    };

    public filterChanged(): boolean {
        return this.filter.type !== undefined || this.filter.email !== "" || this.filter.id !== null;
    }

    public filterReset(): void {
        this.filter = {
            type: undefined,
            email: "",
            id: null,
        };
    } 
}
