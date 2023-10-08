import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CCountriesListService extends CListService {
    public sortBy: string = "code";
    public filter = {
        name: "",
        code: "",
    };

    public filterChanged(): boolean {
        return this.filter.name !== "" || this.filter.code !== "";
    }

    public filterReset(): void {
        this.filter = {
            name: "",
            code: "",
        };
    } 
}
