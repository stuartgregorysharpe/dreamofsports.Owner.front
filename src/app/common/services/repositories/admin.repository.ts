import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CChunk } from 'src/app/model/dto/chunk';
import { CAdmin } from 'src/app/model/entities/admin';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CDataService } from '../data.service';

@Injectable()
export class CAdminRepository extends CRepository<CAdmin> {
    protected entity: string = "CAdmin";
    
    constructor(protected dataService: CDataService) {
        super(dataService);        
    }    

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CAdmin>> {
        return new Promise((resolve, reject) => {
            const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
            this.dataService
                .adminsChunk(dto)
                .subscribe(
                    res => res.statusCode === 200 ? resolve(new CChunk<CAdmin>(res.data.map(d => new CAdmin().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    err => reject(err.message)
                );
        });
    }

    public loadOne(id: number): Promise<CAdmin> {
        return new Promise((resolve, reject) => this.dataService
            .adminsOne(id)
            .subscribe(
                res => res.statusCode === 200 ? resolve(new CAdmin().build(res.data)) : reject(res.error), 
                err => reject(err.message)
            ));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .adminsDelete(id)
            .subscribe(
                res => res.statusCode === 200 ? resolve() : reject(res.error), 
                err => reject(err.message)
            ));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .adminsDeleteBulk(ids)
            .subscribe(
                res => res.statusCode === 200 ? resolve() : reject(res.error), 
                err => reject(err.message)
            ));
    }

    public create(x: CAdmin): Promise<CAdmin> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => this.dataService
            .adminsCreate(fd)
            .subscribe(
                res => res.statusCode === 201 ? resolve(new CAdmin().build(res.data)) : reject(res.error), 
                err => reject(err.message)
            ));
    }

    public update(x: CAdmin): Promise<CAdmin> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => this.dataService
            .adminsUpdate(fd)
            .subscribe(
                res => res.statusCode === 200 ? resolve(new CAdmin().build(res.data)) : reject(res.error), 
                err => reject(err.message)
            ));
    }
}
