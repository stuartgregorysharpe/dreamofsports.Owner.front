import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CPaysystemsListService extends CListService {
    public sortBy: string = "pos";
}
