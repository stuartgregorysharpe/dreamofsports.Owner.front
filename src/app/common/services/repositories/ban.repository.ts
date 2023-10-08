import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CBan } from 'src/app/model/entities/ban';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CBanRepository extends CRepository<CBan> {
    protected entity: string = "CBan";
    
    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CBan>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .bansChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CBan>(res.data.map(d => new CBan().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .bansDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .bansDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CBan): Promise<CBan> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .bansCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CBan().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
