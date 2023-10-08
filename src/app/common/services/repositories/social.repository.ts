import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CSocial } from 'src/app/model/entities/social';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CSocialRepository extends CRepository<CSocial> {
    protected entity: string = "CSocial";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CSocial>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .socialsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CSocial>(res.data.map(d => new CSocial().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CSocial> {
        return new Promise((resolve, reject) => 
            this.dataService
                .socialsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CSocial().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .socialsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .socialsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CSocial): Promise<CSocial> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .socialsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CSocial().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CSocial): Promise<CSocial> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .socialsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CSocial().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
