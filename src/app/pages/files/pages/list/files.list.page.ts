import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CFile } from 'src/app/model/entities/file';
import { CAppService } from 'src/app/common/services/app.service';
import { CFileRepository } from 'src/app/common/services/repositories/file.repository';
import { cfg } from 'src/app/app.config';
import { CFilesListService } from '../../services/files.list.service';

@Component({
	selector: 'files-list-page',
	templateUrl: './files.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CFilesListPage extends CListPage<CFile> implements OnInit {    
    public homeUrl: string = "/files";    

    constructor(        
        protected fileRepository: CFileRepository, 
        protected appService: CAppService,        
        protected listService: CFilesListService,        
    ) {      
        super(fileRepository, appService, listService);
    }  
    
    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["files-head"]); 
            await this.initList();            
            this.appService.monitorLog("[files] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
