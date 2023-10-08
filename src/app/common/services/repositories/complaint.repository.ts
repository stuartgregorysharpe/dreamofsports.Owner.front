import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CComplaint } from 'src/app/model/entities/complaint';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CComplaintRepository extends CRepository<CComplaint> {
    protected entity: string = "CComplaint";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CComplaint>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .complaintsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CComplaint>(res.data.map(d => new CComplaint().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CComplaint> {
        return new Promise((resolve, reject) => 
            this.dataService
                .complaintsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CComplaint().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .complaintsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .complaintsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CComplaint): Promise<CComplaint> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .complaintsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CComplaint().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
