import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CArticleCat } from 'src/app/model/entities/article.cat';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CArticleCatRepository extends CRepository<CArticleCat> {
    protected entity: string = "CArticleCat";
    protected entityML: string = "CArticleCatTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CArticleCat>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .articleCatsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CArticleCat>(res.data.map(d => new CArticleCat().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CArticleCat> {
        return new Promise((resolve, reject) => 
            this.dataService
                .articleCatsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CArticleCat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .articleCatsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .articleCatsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CArticleCat): Promise<CArticleCat> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .articleCatsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CArticleCat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CArticleCat): Promise<CArticleCat> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .articleCatsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CArticleCat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
