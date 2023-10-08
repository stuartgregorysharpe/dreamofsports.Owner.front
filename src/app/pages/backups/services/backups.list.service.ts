import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class BackupsListService extends CListService {
    public sortBy: string = "created_at";    
    public sortDir: number = -1;
}
