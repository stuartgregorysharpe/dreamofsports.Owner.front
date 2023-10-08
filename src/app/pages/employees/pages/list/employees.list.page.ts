import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CEmployee } from 'src/app/model/entities/employee';
import { CEmployeeRepository } from 'src/app/common/services/repositories/employee.repository';
import { CAppService } from 'src/app/common/services/app.service';
import { CLangRepository } from 'src/app/common/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CEmployeesListService } from '../../services/employees.list.service';

@Component({
	selector: 'employees-list-page',
	templateUrl: './employees.list.page.html',	
    styleUrls: ["../../../../common/styles/lists.scss"],
})
export class CEmployeesListPage extends CListPage<CEmployee> implements OnInit {    
    public homeUrl: string = "/employees";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 

    constructor(        
        protected employeeRepository: CEmployeeRepository, 
        protected appService: CAppService,        
        protected listService: CEmployeesListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(employeeRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["employees-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];        
            this.appService.monitorLog("[employees] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

