import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CChunk } from 'src/app/model/dto/chunk';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CCat } from 'src/app/model/entities/cat';
import { CDataService } from '../data.service';

@Injectable()
export class CCatRepository extends CRepository<CCat> {
    protected entity: string = "CCat";
    protected entityML: string = "CCatTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<CChunk<CCat>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>             
            this.dataService
                .catsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CCat>(this.tree2list(res.data).map(d => new CCat().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public loadOne(id: number): Promise<CCat> {
        return new Promise((resolve, reject) => 
            this.dataService
                .catsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CCat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .catsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .catsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CCat): Promise<CCat> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .catsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CCat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CCat): Promise<CCat> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .catsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CCat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
