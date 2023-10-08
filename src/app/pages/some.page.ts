import { CAppService } from '../common/services/app.service';
import { IThelang } from '../model/entities/thelang';

export abstract class CSomePage {
    constructor(protected appService: CAppService) {}
    get thelang(): IThelang {return this.appService.thelang;}
}