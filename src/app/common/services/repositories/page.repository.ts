import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CChunk } from 'src/app/model/dto/chunk';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CPage } from 'src/app/model/entities/page';
import { CDataService } from '../data.service';

@Injectable()
export class CPageRepository extends CRepository<CPage> {
    protected entity: string = "CPage";
    protected entityML: string = "CPageTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<CChunk<CPage>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>             
            this.dataService
                .pagesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CPage>(this.tree2list(res.data).map(d => new CPage().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public loadOne(id: number): Promise<CPage> {
        return new Promise((resolve, reject) => 
            this.dataService
                .pagesOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CPage().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .pagesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .pagesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CPage): Promise<CPage> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .pagesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CPage().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CPage): Promise<CPage> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .pagesUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CPage().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
