import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CPaysystem } from 'src/app/model/entities/paysystem';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CPaysystemRepository extends CRepository<CPaysystem> {
    protected entity: string = "CPaysystem";
    protected entityML: string = "CPaysystemTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CPaysystem>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .paysystemsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CPaysystem>(res.data.map(d => new CPaysystem().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CPaysystem> {
        return new Promise((resolve, reject) => 
            this.dataService
                .paysystemsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CPaysystem().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .paysystemsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .paysystemsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CPaysystem): Promise<CPaysystem> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .paysystemsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CPaysystem().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CPaysystem): Promise<CPaysystem> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .paysystemsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CPaysystem().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
