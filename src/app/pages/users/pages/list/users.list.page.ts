import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CUsersListService } from '../../services/users.list.service';
import { CUserRepository } from 'src/app/common/services/repositories/user.repository';
import { CUser } from 'src/app/model/entities/user';
import { ExcelService } from 'src/app/common/services/excel.service';

import * as XLSX from 'xlsx';


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
        private exelService: ExcelService,  
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

    public downloadData(user: any): void {
        let dataToDownload = [
            ['ID', user.id],
            ['Created At', user.created_at],
            ['Type', user.type],
            ['Email', user.email],
            ['Active', user.active]
        ];
    
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToDownload);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'UserData');
    
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    
        function s2ab(s: string): ArrayBuffer {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
    
        let downloadLink = document.createElement('a');
        let url = URL.createObjectURL(blob);
      
        downloadLink.href = url;
        downloadLink.download = 'userData.xlsx';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    public async exportToExcel() {
        await this.exelService.exportToExcel(this.xlForCal, 'UsersList');
    }
    
    public async downloadAllUserData() {
        await this.getAllList();
        await this.exportToExcel();
    }
}

