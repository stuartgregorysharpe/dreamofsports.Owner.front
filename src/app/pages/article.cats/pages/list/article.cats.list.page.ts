import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CArticleCat } from 'src/app/model/entities/article.cat';
import { CArticleCatRepository } from 'src/app/common/services/repositories/article.cat.repository';
import { CArticleCatsListService } from '../../services/article.cats.list.service';

@Component({
	selector: 'articlecats-list-page',
	templateUrl: './article.cats.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CArticleCatsListPage extends CListPage<CArticleCat> implements OnInit {    
    public homeUrl: string = "/articles/cats";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 

    constructor(        
        protected articleCatRepository: CArticleCatRepository, 
        protected appService: CAppService,        
        protected listService: CArticleCatsListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(articleCatRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["articlecats-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];        
            this.appService.monitorLog("[article.cats] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

