import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';
import { CAdminGroup } from 'src/app/model/entities/admin.group';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CChunk } from 'src/app/model/dto/chunk';

@Injectable()
export class CAdminGroupRepository extends CRepository<CAdminGroup> {
    constructor(protected dataService: CDataService) {
        super(dataService);        
    }

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CAdminGroup>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .adminGroupsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CAdminGroup>(res.data.map(d => new CAdminGroup().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }  

    public loadOne(id: number): Promise<CAdminGroup> {
        return new Promise((resolve, reject) => this.dataService
            .adminGroupsOne(id)
            .subscribe({
                next: res => res.statusCode === 200 ? resolve(new CAdminGroup().build(res.data)) : reject(res.error), 
                error: err => reject(err.message)
            }));
    }
}
