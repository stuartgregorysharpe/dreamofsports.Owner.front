import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { CAppService } from "src/app/common/services/app.service";
import { CRepository } from "src/app/common/services/repositories/_repository";
import { CEntity } from "src/app/model/entities/_entity";
import { CTranslatableEntity } from "src/app/model/entities/_translatable.entity";
import { IKeyValue } from "src/app/model/keyvalue.interface";
import { PanelComponent } from "../panel.component";

@Component({
    selector: "panel-select",
    templateUrl: "panel-select.component.html",
    styleUrls: [
		"../../../styles/panels.scss",
		"../../../styles/lists.scss",
		"panel-select.component.scss",
	],
})
export class CPanelSelectComponent extends PanelComponent implements OnChanges {
	@Input() public title: string = "";
	@Input() public titleClass: string = ""
	@Input() public entity: string;
	@Input() public selected: number[] = [];
	@Input() public fields: string[] = [];
	@Input() public sortableFields: string[] = [];
	@Input() public filterableFields: string[] = []; // only for simple string params for now
	@Input() public filterableFieldNames: string[] = [];
	@Input() public multilangableFields: string[] = []; // TODO
	@Input() public fieldNames: string[] = [];
	@Input() public sortBy: string = "id";
	@Input() public sortDir: number = 1;
	@Output() private apply: EventEmitter<CEntity[]> = new EventEmitter();

	@ViewChild("container", {static: false}) containerRef: ElementRef; 

    public entities: CTranslatableEntity<any>[] = [];
	public loading: boolean = false;
    public loadingMore: boolean = false;     
    public part: number = 0;
    public chunkLength: number = 30;
    public exhausted: boolean = false;   
	public filter: IKeyValue<any> = {};
	public filterActive: boolean = false;

    constructor(
		protected appService: CAppService,
		// protected someRepository: SomeRepository - any compatible repo
	) 
	{
		super(appService);
	}

	get repository(): CRepository<CTranslatableEntity<any>> {return this[`${this.entity}Repository`];}
	get container(): HTMLElement {return this.containerRef.nativeElement;}
    get scrolledToBottom(): boolean {return this.container.scrollHeight - this.container.scrollTop < this.container.clientHeight + 200;}
    get canLoadMore(): boolean {return !this.loadingMore && !this.exhausted && this.scrolledToBottom;}  
	get finalFilter(): IKeyValue<any> {
		const filter = {id_not_in: this.selected};

		for (let f in this.filter) {
			filter[f] = this.filter[f];
		}

		return filter;
	}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["active"]?.currentValue) { 
			this.entities = [];
			this.initEntities();
			this.initFilter();
        }
    }

	private initFilter(): void {
		this.filterActive = false;
		this.filterableFields.forEach(f => this.filter[f] = "");
	}

	public filterChanged(): boolean {
        for (let f of this.filterableFields) {
			if (this.filter[f] !== "") {
				return true;
			}
		}

		return false;
    }

    public filterReset(): void {
        this.filterableFields.forEach(f => this.filter[f] = "");
		this.initEntities();
    } 

	private async initEntities(): Promise<void> {
		try {
			this.loading = true;
            await this.appService.pause(300);
            this.part = 0;
            const chunk = await this.repository.loadChunk(this.part, this.chunkLength, this.sortBy, this.sortDir, this.finalFilter);   
            this.entities = chunk.data;            
            this.exhausted = !chunk.elementsQuantity || this.part + 1 === chunk.pagesQuantity;  
            this.loading = false;
		} catch (err) {
			this.appService.monitorLog(err, true);
			this.loading = false;
		}
	}

	public isSortable(field: string): boolean {
		return this.sortableFields.includes(field);
	}

	public onChangeSorting(sortBy: string): void {
        if (this.sortBy === sortBy) {
            this.sortDir *= -1;
        } else {
            this.sortBy = sortBy;
            this.sortDir = 1;
        }

        this.initEntities();
    }

	public async onScroll(): Promise<void> {
        try {			            
            if (this.canLoadMore) {
				this.loadingMore = true;
				this.part++;                
                const chunk = await this.repository.loadChunk(this.part, this.chunkLength, this.sortBy, this.sortDir, this.finalFilter);  
                this.entities = [...this.entities, ...chunk.data];                                         
                this.exhausted = !chunk.elementsQuantity || this.part + 1 === chunk.pagesQuantity;  
				this.loadingMore = false;		                
			}			
		} catch (err) {
			this.appService.monitorLog(err, true);
            this.loadingMore = false;
		}
    }

	public onApply(): void {
		this.apply.emit(this.entities.filter(x => x.__selected));
		this.onClose();
	}

	@HostListener("keydown", ["$event"])
	private onKeydown(event: KeyboardEvent): void {
		if (event.key === "Enter") {
			event.preventDefault();
			this.initEntities();
		}
	}
}