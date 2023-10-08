import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';
import { CChunk } from 'src/app/model/dto/chunk';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CLang } from 'src/app/model/entities/lang';

@Injectable()
export class CLangRepository extends CRepository<CLang> {
    protected entity: string = "CLang";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }    

    public loadAll(sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<CLang[]> {
        const dto: IGetList = {sortBy, sortDir, filter};           
        return new Promise((resolve, reject) => 
            this.dataService
                .langsAll(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(res.data.map(d => new CLang().build(d))) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CLang>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) => 
            this.dataService
                .langsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CLang>(res.data.map(d => new CLang().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public loadOne(id: number): Promise<CLang> {
        return new Promise((resolve, reject) => 
            this.dataService
                .langsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CLang().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .langsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .langsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public create(x: CLang): Promise<CLang> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .langsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CLang().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public update(x: CLang): Promise<CLang> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .langsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CLang().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }
}
