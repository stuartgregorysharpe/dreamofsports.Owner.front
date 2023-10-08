import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CUser } from 'src/app/model/entities/user';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CUserRepository extends CRepository<CUser> {
    protected entity: string = "CUser";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CUser>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .usersChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CUser>(res.data.map(d => new CUser().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CUser> {
        return new Promise((resolve, reject) => 
            this.dataService
                .usersOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CUser().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .usersDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .usersDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CUser): Promise<CUser> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .usersCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CUser().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CUser): Promise<CUser> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .usersUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CUser().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    ///////////////////
    // utils
    ///////////////////

    protected buildFormData(x: CUser): FormData {
		const fd = new FormData();
        const data = (window as any).structuredClone(x); // deep copy, to prevent iface reaction for some rebuild :-)

		data.athlet.img instanceof File && fd.append(`athlet_img`, data.athlet.img as unknown as File);
		data.firm.img instanceof File && fd.append(`firm_img`, data.firm.img as unknown as File);
		
		for (let image of data.images) {
			if (image.url instanceof File) {
				fd.append("images", image.url);
				image.url = image.url.name; // чтобы потом связать, где какое вложение
			}
		}

		for (let video of data.videos) {
			if (video.url instanceof File) {
				fd.append("videos", video.url);
				video.url = video.url.name; // чтобы потом связать, где какое вложение
			}
		}

		for (let other of data.others) {
			if (other.url instanceof File) {
				fd.append("others", other.url);
				other.url = other.url.name; // чтобы потом связать, где какое вложение
			}
		}

        for (let reward of data.athlet.rewards) {
            if (reward.img instanceof File) {
                fd.append("rewards", reward.img);
                reward.img = reward.img.name; // чтобы потом связать, где какое вложение
            }
        }

		fd.append("data", JSON.stringify(data));
		return fd;
	}
}
