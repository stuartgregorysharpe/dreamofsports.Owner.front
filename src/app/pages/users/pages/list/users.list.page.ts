import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CUsersListService } from '../../services/users.list.service';
import { CUserRepository } from 'src/app/common/services/repositories/user.repository';
import { CUser } from 'src/app/model/entities/user';

@Component({
	selector: 'users-list-page',
	templateUrl: './users.list.page.html',	
    styleUrls: [
        "../../../../common/styles/lists.scss",
        "../../../../common/styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CUsersListPage extends CListPage<CUser> implements OnInit {    
    public homeUrl: string = "/catalogue/users";  

    constructor(        
        protected userRepository: CUserRepository, 
        protected appService: CAppService,        
        protected listService: CUsersListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(userRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["users-head"]); 
            await this.initList();    
            this.appService.monitorLog("[users] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
    public downloadData(user: any) {
        let dataToDownload = [
          ['ID', user.id],
          ['Created At', user.created_at],
          ['Type', user.type],
          ['Email', user.email],
          ['Active', user.active]
          //... add other user fields as needed
        ];
      
        let csvContent = dataToDownload.map(e => e.join(",")).join("\n");
        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        let downloadLink = document.createElement('a');
        let url = URL.createObjectURL(blob);
      
        downloadLink.href = url;
        downloadLink.download = 'userData.csv';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
          
}

