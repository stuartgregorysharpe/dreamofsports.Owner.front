import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CTariff } from 'src/app/model/entities/tariff';
import { CAppService } from 'src/app/common/services/app.service';
import { CTariffsListService } from '../../services/tariffs.list.service';
import { CTariffRepository } from 'src/app/common/services/repositories/tariff.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';

@Component({
	selector: 'tariffs-list-page',
	templateUrl: './tariffs.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CTariffsListPage extends CListPage<CTariff> implements OnInit {    
    public homeUrl: string = "/finances/tariffs";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 
    
    constructor(        
        protected tariffRepository: CTariffRepository, 
        protected appService: CAppService,        
        protected listService: CTariffsListService,  
        protected langRepository: CLangRepository,     
    ) 
    {      
        super(tariffRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["tariffs-head"]); 
            await this.initList();  
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];       
            this.appService.monitorLog("[tariffs] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

