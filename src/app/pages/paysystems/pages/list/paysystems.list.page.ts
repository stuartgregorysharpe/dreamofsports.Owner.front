import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CPaysystem } from 'src/app/model/entities/paysystem';
import { CAppService } from 'src/app/common/services/app.service';
import { CPaysystemsListService } from '../../services/paysystems.list.service';
import { CPaysystemRepository } from 'src/app/common/services/repositories/paysystem.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';

@Component({
	selector: 'paysystems-list-page',
	templateUrl: './paysystems.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CPaysystemsListPage extends CListPage<CPaysystem> implements OnInit {    
    public homeUrl: string = "/finances/paysystems";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 
    
    constructor(        
        protected paysystemRepository: CPaysystemRepository, 
        protected appService: CAppService,        
        protected listService: CPaysystemsListService,  
        protected langRepository: CLangRepository,     
    ) 
    {      
        super(paysystemRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["paysystems-head"]); 
            await this.initList();  
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];       
            this.appService.monitorLog("[paysystems] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

