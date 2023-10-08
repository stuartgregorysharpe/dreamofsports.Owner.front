import { Component, Input, OnInit } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CRepository } from "src/app/common/services/repositories/_repository";
import { CEntity } from "src/app/model/entities/_entity";

@Component({
    selector: "select-multiple",
    templateUrl: "select-multiple.component.html",
    styleUrls: ["select-multiple.component.scss"],
})
export class CSelectMultipleComponent implements OnInit {
    @Input() public value: any[];
    @Input() public field: string;
    @Input() public sortBy: string = "id";
    @Input() public sortDir: number = 1;
    @Input() public entity: string;
    @Input() public multilang: boolean = false;
    public sitems: CEntity[] = [];

    constructor(
        private appService: CAppService,      
        // private someRepository: SomeRepository, - any compatible repo
    ) {}  

    get sitemsRepository(): CRepository<CEntity> {return this[`${this.entity}Repository`];}
    get valueIds(): number[] {return this.value.map(v => v.id);}

    public ngOnInit(): void {        
        this.initSelectableItems();
    }

    public async initSelectableItems(): Promise<void> {
        try {                                          
            this.sitems = await this.sitemsRepository.loadAll(this.sortBy, this.sortDir, {});        
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }

    public includes(sitem: CEntity): boolean {
        return this.value.map(v => v.id).includes(sitem.id);
    }

    public onSitemClick(sitem: CEntity): void {
        if (this.includes(sitem)) {
            const index = this.value.findIndex(v => v.id === sitem.id);
            this.value.splice(index, 1);
        } else {
            this.value.push(sitem);
            this.appService.sort(this.value, this.sortBy, this.sortDir);
        }
    }
}