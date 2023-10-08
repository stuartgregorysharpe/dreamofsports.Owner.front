import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CCatRepository } from 'src/app/common/services/repositories/cat.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CCatsListService } from '../../services/cats.list.service';
import { CCat } from 'src/app/model/entities/cat';

@Component({
	selector: 'cats-list-page',
	templateUrl: './cats.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CCatsListPage extends CListPage<CCat> implements OnInit {    
    public homeUrl: string = "/catalogue/cats";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 

    constructor(        
        protected catRepository: CCatRepository, 
        protected appService: CAppService,        
        protected listService: CCatsListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(catRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["cats-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];        
            this.appService.monitorLog("[cats] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

