import { Component, OnInit } from '@angular/core';
import { CAppService } from 'src/app/common/services/app.service';
import { IThelang } from 'src/app/model/entities/thelang';
import { COptions } from 'src/app/model/options';
import { CSomePage } from '../some.page';

@Component({
	selector: 'options-page',
	templateUrl: './options.page.html',	
    styleUrls: ["../../common/styles/forms.scss"],
})
export class COptionsPage extends CSomePage implements OnInit {	
    public temp: COptions = null;

    constructor(protected appService: CAppService) {
        super(appService);
    }	  
    
    get thelangs(): IThelang[] {return this.appService.thelangs;}
    get options(): COptions {return this.appService.options;}

    public ngOnInit(): void {
        this.appService.setTitle(this.thelang.words["options-head"]); 
        this.temp = this.appService.clone(this.options);
        this.appService.monitorLog("[options] page loaded");
    }

    public async update(): Promise<void> {
        for (let field in this.temp) {
            this.options[field] = this.temp[field];
        }

        this.options.save();
        this.appService.thelang = this.thelangs.find(al => al.slug === this.options.thelangSlug);
        this.appService.setTitle(this.thelang.words["options-head"]); 
        this.appService.monitorLog("options saved");
    }
}
