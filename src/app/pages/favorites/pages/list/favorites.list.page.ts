import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CFavorite } from 'src/app/model/entities/favorite';
import { CAppService } from 'src/app/common/services/app.service';
import { CFavoritesListService } from '../../services/favorites.list.service';
import { CFavoriteRepository } from 'src/app/common/services/repositories/favorite.repository';

@Component({
	selector: 'favorites-list-page',
	templateUrl: './favorites.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CFavoritesListPage extends CListPage<CFavorite> implements OnInit {    
    public homeUrl: string = "/catalogue/favorites";  
    
    constructor(        
        protected favoriteRepository: CFavoriteRepository, 
        protected appService: CAppService,        
        protected listService: CFavoritesListService,  
    ) 
    {      
        super(favoriteRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["favorites-head"]); 
            await this.initList();    
            this.appService.monitorLog("[favorites] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

