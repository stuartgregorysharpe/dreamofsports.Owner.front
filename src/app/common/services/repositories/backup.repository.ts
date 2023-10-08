import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';
import { CChunk } from 'src/app/model/dto/chunk';
import { CBackup } from 'src/app/model/entities/backup';
import { IGetList } from 'src/app/model/dto/getlist.interface';

@Injectable()
export class CBackupRepository extends CRepository<CBackup> {
    constructor(protected dataService: CDataService) {
        super(dataService);        
    }    

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CBackup>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>             
            this.dataService
                .backupsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CBackup>(res.data.map(d => new CBackup().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .backupsDelete(id)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                error: err => reject(err.message)
            }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .backupsDeleteBulk(ids)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                error: err => reject(err.message)
            }));
    }

    public create(): Promise<void> {
        return new Promise((resolve, reject) => this.dataService
            .backupsCreate()
            .subscribe({
                next: res => res.statusCode === 201 ? resolve() : reject(res.error), 
                error: err => reject(err.message)
            }));
    }    
}
