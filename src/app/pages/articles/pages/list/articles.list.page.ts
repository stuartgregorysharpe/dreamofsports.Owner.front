import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CArticle } from 'src/app/model/entities/article';
import { CArticleRepository } from 'src/app/common/services/repositories/article.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CArticlesListService } from '../../services/articles.list.service';

@Component({
	selector: 'articles-list-page',
	templateUrl: './articles.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CArticlesListPage extends CListPage<CArticle> implements OnInit {    
    public homeUrl: string = "/articles/articles";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 

    constructor(        
        protected articleRepository: CArticleRepository, 
        protected appService: CAppService,        
        protected listService: CArticlesListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(articleRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["articles-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];        
            this.appService.monitorLog("[articles] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

