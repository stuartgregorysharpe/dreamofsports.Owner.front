import { Injectable } from "@angular/core";
import { CListService } from "src/app/common/services/list.service";

@Injectable()
export class CModerableImagesListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;    
}
