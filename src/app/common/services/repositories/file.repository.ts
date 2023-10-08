import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';
import { CChunk } from 'src/app/model/dto/chunk';
import { CFile } from 'src/app/model/entities/file';
import { IGetList } from 'src/app/model/dto/getlist.interface';

@Injectable()
export class CFileRepository extends CRepository<CFile> {
    protected entity: string = "CFile";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }    

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CFile>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>             
            this.dataService
                .filesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CFile>(res.data.map(d => new CFile().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CFile> {
        return new Promise((resolve, reject) => this.dataService
            .filesOne(id)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve(new CFile().build(res.data)) : reject(res.error), 
                error: err => reject(err.message)
            }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .filesDelete(id)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                error: err => reject(err.message)
            }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .filesDeleteBulk(ids)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                error: err => reject(err.message)
            }));
    }

    public create(x: CFile): Promise<CFile> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => this.dataService
            .filesCreate(fd)
            .subscribe({
                next: res => res.statusCode === 201 ? resolve(new CFile().build(res.data)) : reject(res.error), 
                error: err => reject(err.message)
    }       ));
    }

    public update(x: CFile): Promise<CFile> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => this.dataService
            .filesUpdate(fd)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve(new CFile().build(res.data)) : reject(res.error), 
                error: err => reject(err.message)
            }));
    }
}
