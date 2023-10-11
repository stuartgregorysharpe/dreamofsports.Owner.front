import { CChunk } from '../model/dto/chunk';
import { CEntity } from '../model/entities/_entity';
import { CRepository } from '../common/services/repositories/_repository';
import { CAppService } from '../common/services/app.service';
import { CListService } from '../common/services/list.service';
import { CSomePage } from './some.page';

export abstract class CListPage<T extends CEntity> extends CSomePage {
    public abstract homeUrl: string;
    public chunk: CChunk<T> = new CChunk();
    public chunkForCal: CChunk<T> = new CChunk();
    public ready: boolean = false;
    public reloading: boolean = false;
    public allSelected: boolean = false;

    constructor(
        protected repository: CRepository<T>,
        protected appService: CAppService,
        protected listService: CListService,
    ) {
        super(appService);
    }

    get part(): number { return this.listService.part; }
    set part(v: number) { this.listService.part = v; }
    get chunkLength(): number { return this.appService.options.chunkLength; }
    get elementsQuantity(): number { return this.chunk.elementsQuantity; }
    get pagesQuantity(): number { return this.chunk.pagesQuantity; }
    get xl(): T[] { return this.chunk.data; }
    get xlForCal(): T[] { return this.chunkForCal.data; }
    get sortBy(): string { return this.listService.sortBy; }
    set sortBy(v: string) { this.listService.sortBy = v; }
    get sortDir(): number { return this.listService.sortDir; }
    set sortDir(v: number) { this.listService.sortDir = v; }
    get filter(): any { return this.listService.filter; }
    get filterActive(): boolean { return this.listService.filterActive; }
    set filterActive(v: boolean) { this.listService.filterActive = v; }
    get filterChanged(): boolean { return this.listService.filterChanged(); }
    get canDeleteBulk(): boolean { return !!this.xl.filter(x => x.__selected).length; }

    public async initList(reloading: boolean = false): Promise<void> {
        try {
            this.reloading = reloading;
            this.allSelected = false;
            this.chunk = await this.repository.loadChunk(this.part, this.chunkLength, this.sortBy, this.sortDir, this.filter);
            this.appService.monitorLog(`data loaded, currentPart=${this.part}, sortBy=${this.sortBy}, sortDir=${this.sortDir}`);

            if (this.part > 0 && !this.chunk.data.length) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again            
                this.part--;
                this.initList(reloading);
            } else {
                await this.appService.pause(500);
                this.reloading = false;
            }
        } catch (err) {
            this.appService.monitorLog(err, true);
            await this.appService.pause(500);
            this.reloading = false;
        }
    }

    public changeSorting(sortBy: string): void {
        if (this.sortBy === sortBy) {
            this.sortDir *= -1;
        } else {
            this.sortBy = sortBy;
            this.sortDir = 1;
        }

        this.initList(true);
    }

    public async getAllList(): Promise<void> {
        this.sortDir = 1;
        this.chunkForCal = await this.repository.loadChunk(0, 1000000, 'id', this.sortDir, this.filter);
    }

    public async updateParam(e: CEntity, p: string): Promise<void> {
        try {
            this.appService.monitorLog(`updating entity: id=${e.id} param=${p} value=${e[p]}`);
            await this.repository.updateParam(e.id, p, e[p]);
            this.appService.monitorLog("ok");
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }

    public async updateMlParam(e: CEntity, p: string): Promise<void> {
        try {
            this.appService.monitorLog(`updating multilang entity: id=${e.id} param=${p} value=${e[p]}`);
            await this.repository.updateMlParam(e.id, p, e[p]);
            this.appService.monitorLog("ok");
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }

    // egoistic param:
    // В наборе сущностей только одна может иметь значение эгоистичного параметра, равное true.
    // Также параметр-эгоист может быть таковым в подмножествах (проекционно-эгоистичным), например, регионально-эгоистичный, 
    // т.е. среди объектов с region_id=N только один может иметь значение параметра-эгоиста, равное true,
    // для этого используется filter
    public async updateEgoisticParam(e: CEntity, p: string, filter: any = {}): Promise<void> {
        try {
            if (e[p]) {
                this.xl.filter(x => x.id !== e.id && Object.keys(filter).every(k => filter[k] === x[k])).forEach(x => {
                    x[p] = false;
                });
            }

            this.appService.monitorLog(`updating egoistic parameter: id=${e.id} param=${p} value=${e[p]}`);
            await this.repository.updateEgoisticParam(e.id, p, e[p], filter);
            this.appService.monitorLog("ok");
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            if (confirm(this.thelang.words['common-sure'])) {
                this.reloading = true;
                this.appService.monitorLog(`deleting object: id=${id}`);
                await this.repository.delete(id);
                this.appService.monitorLog("ok");
                this.initList();
            }
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            this.reloading = false;
        }
    }

    public async deleteBulk(): Promise<void> {
        try {
            if (this.canDeleteBulk && confirm(this.thelang.words['common-sure'])) {
                this.reloading = true;
                let ids = this.xl.filter(x => x.__selected).map(x => x.id);
                this.appService.monitorLog(`deleting multiple objects: id=${ids.toString()}`);
                await this.repository.deleteBulk(ids);
                this.appService.monitorLog("ok");
                this.initList();
            }
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            this.reloading = false;
        }
    }

    public async import(): Promise<void> {
        try {
            if (confirm(this.thelang.words['common-sure'])) {
                this.reloading = true;
                this.appService.monitorLog(`import started`);
                await this.repository.import();
                this.appService.monitorLog(`import finished`);
                this.initList();
            }
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            this.reloading = false;
        }
    }

    public onSelect(): void {
        let allSelected: boolean = true;

        for (let x of this.xl) {
            if (!x.__selected && !x.defended) {
                allSelected = false;
                break;
            }
        }

        this.allSelected = allSelected;
    }

    public onSelectAll(): void {
        this.xl.filter(x => !x.defended).forEach(x => { x.__selected = this.allSelected });
    }

    public filterReset(): void {
        this.listService.filterReset();
        this.initList(true);
    }

    public filterApply(): void {
        this.part = 0;
        this.initList(true);
    }
}
