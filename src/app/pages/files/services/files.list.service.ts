import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CFilesListService extends CListService {
    public sortBy: string = "mark";
    public filter = {
        mark: "",
    };

    public filterChanged(): boolean {
        return this.filter.mark !== "";
    }

    public filterReset(): void {
        this.filter = {
            mark: "",
        };
    } 
}
