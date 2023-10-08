import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CArticle } from 'src/app/model/entities/article';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CArticleRepository extends CRepository<CArticle> {
    protected entity: string = "CArticle";
    protected entityML: string = "CArticleTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CArticle>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .articlesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CArticle>(res.data.map(d => new CArticle().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CArticle> {
        return new Promise((resolve, reject) => 
            this.dataService
                .articlesOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CArticle().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .articlesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .articlesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CArticle): Promise<CArticle> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .articlesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CArticle().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CArticle): Promise<CArticle> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .articlesUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CArticle().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
