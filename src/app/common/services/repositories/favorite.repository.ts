import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CFavorite } from 'src/app/model/entities/favorite';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CFavoriteRepository extends CRepository<CFavorite> {
    protected entity: string = "CFavorite";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CFavorite>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .favoritesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CFavorite>(res.data.map(d => new CFavorite().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .favoritesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .favoritesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CFavorite): Promise<CFavorite> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .favoritesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CFavorite().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
