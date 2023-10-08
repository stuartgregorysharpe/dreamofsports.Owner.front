import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CCountry } from 'src/app/model/entities/country';
import { CCountryRepository } from 'src/app/common/services/repositories/country.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CCountriesListService } from '../../services/countries.list.service';

@Component({
	selector: 'countries-list-page',
	templateUrl: './countries.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CCountriesListPage extends CListPage<CCountry> implements OnInit {    
    public homeUrl: string = "/localization/countries";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 

    constructor(        
        protected countryRepository: CCountryRepository, 
        protected appService: CAppService,        
        protected listService: CCountriesListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(countryRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["countries-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];        
            this.appService.monitorLog("[countries] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

