import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CCountry } from 'src/app/model/entities/country';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CCountryRepository extends CRepository<CCountry> {
    protected entity: string = "CCountry";
    protected entityML: string = "CCountryTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CCountry>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .countriesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CCountry>(res.data.map(d => new CCountry().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CCountry> {
        return new Promise((resolve, reject) => 
            this.dataService
                .countriesOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CCountry().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .countriesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .countriesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CCountry): Promise<CCountry> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .countriesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CCountry().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CCountry): Promise<CCountry> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .countriesUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CCountry().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
