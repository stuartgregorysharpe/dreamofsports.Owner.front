import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CEmployee } from 'src/app/model/entities/employee';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CEmployeeRepository extends CRepository<CEmployee> {
    protected entity: string = "CEmployee";
    protected entityML: string = "CEmployeeTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CEmployee>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .employeesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CEmployee>(res.data.map(d => new CEmployee().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CEmployee> {
        return new Promise((resolve, reject) => 
            this.dataService
                .employeesOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CEmployee().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .employeesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .employeesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CEmployee): Promise<CEmployee> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .employeesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CEmployee().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CEmployee): Promise<CEmployee> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .employeesUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CEmployee().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
