import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CMailtemplate } from 'src/app/model/entities/mailtemplate';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CMailtemplateRepository extends CRepository<CMailtemplate> {
    protected entity: string = "CMailtemplate";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CMailtemplate>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .mailtemplatesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CMailtemplate>(res.data.map(d => new CMailtemplate().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CMailtemplate> {
        return new Promise((resolve, reject) => 
            this.dataService
                .mailtemplatesOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CMailtemplate().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .mailtemplatesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .mailtemplatesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CMailtemplate): Promise<CMailtemplate> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .mailtemplatesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CMailtemplate().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CMailtemplate): Promise<CMailtemplate> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .mailtemplatesUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CMailtemplate().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
