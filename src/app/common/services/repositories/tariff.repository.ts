import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CTariff } from 'src/app/model/entities/tariff';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CTariffRepository extends CRepository<CTariff> {
    protected entity: string = "CTariff";
    protected entityML: string = "CTariffTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CTariff>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .tariffsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CTariff>(res.data.map(d => new CTariff().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CTariff> {
        return new Promise((resolve, reject) => 
            this.dataService
                .tariffsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CTariff().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .tariffsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .tariffsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CTariff): Promise<CTariff> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .tariffsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CTariff().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CTariff): Promise<CTariff> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .tariffsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CTariff().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
