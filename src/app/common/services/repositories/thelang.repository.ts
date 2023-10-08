import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';
import { IThelang } from 'src/app/model/entities/thelang';

@Injectable()
export class CThelangRepository extends CRepository<IThelang> {
    constructor(protected dataService: CDataService) {
        super(dataService);        
    }

    public loadAll(): Promise<IThelang[]> {
        return new Promise((resolve, reject) =>         
            this.dataService
                .thelangsAll()
                .subscribe({
                    next: res => resolve(res), 
                    error: err => reject(err.message),
                }));
    }    
}
