import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CPage } from 'src/app/model/entities/page';
import { CPageRepository } from 'src/app/common/services/repositories/page.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CPagesListService } from '../../services/pages.list.service';

@Component({
	selector: 'pages-list-page',
	templateUrl: './pages.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CPagesListPage extends CListPage<CPage> implements OnInit {    
    public homeUrl: string = "/pages";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 

    constructor(        
        protected pageRepository: CPageRepository, 
        protected appService: CAppService,        
        protected listService: CPagesListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(pageRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["pages-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];        
            this.appService.monitorLog("[pages] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

