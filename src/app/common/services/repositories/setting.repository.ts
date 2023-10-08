import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';
import { CChunk } from 'src/app/model/dto/chunk';
import { CSetting } from 'src/app/model/entities/setting';
import { IGetList } from 'src/app/model/dto/getlist.interface';

@Injectable()
export class CSettingRepository extends CRepository<CSetting> {
    protected entity: string = "CSetting";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }    

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CSetting>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>             
            this.dataService
                .settingsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CSetting>(res.data.map(d => new CSetting().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .settingsDelete(id)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                error: err => reject(err.message)
            }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .settingsDeleteBulk(ids)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                error: err => reject(err.message)
            }));
    }

    public create(x: CSetting): Promise<CSetting> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => this.dataService
            .settingsCreate(fd)
            .subscribe({
                next: res => res.statusCode === 201 ? resolve(new CSetting().build(res.data)) : reject(res.error), 
                error: err => reject(err.message)
            }));
    }    
}
