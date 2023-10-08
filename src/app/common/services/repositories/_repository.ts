import { IChildable } from 'src/app/model/childable.interface';
import { CChunk } from 'src/app/model/dto/chunk';
import { CDataService } from '../data.service';
import { CEntity } from 'src/app/model/entities/_entity';

export abstract class CRepository<T> {
    protected entity?: string; // name of ORM model or Mongoose entity
    protected entityML?: string; // name of ORM model or Mongoose entity for multilang param sets    

    constructor(protected dataService: CDataService) {}

    // optional methods (they are abstract in fact)
    public loadAll?(sortBy: string, sortDir: number, filter: any): Promise<T[]>;
    public loadChunk?(part: number, chunkLength: number, sortBy: string, sortDir: number, filter: any): Promise<CChunk<T>>;
    public loadOne?(id: number): Promise<T>;    
    public delete?(id: number): Promise<void>;
    public deleteBulk?(ids: number[]): Promise<void>;
    public create?(x?: CEntity): Promise<T | void>;
    public update?(x: CEntity): Promise<T>;
    public import?(): Promise<void>;
    
    public updateParam (id: number, p: string, v: any): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .updateParam(this.entity, id, p, v)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message),
                }));        
    }

    public updateEgoisticParam (id: number, p: string, v: boolean, filter: any): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .updateEgoisticParam(this.entity, id, p, v, filter)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message),
                }));        
    }  
    
    public updateMlParam (id: number, p: string, v: any): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .updateParam(this.entityML, id, p, v)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message),
                }));        
    }
    
    public tree2list(tree: IChildable[]): IChildable[] {
        let list: IChildable[] = [];
        const buildChildren = (children: IChildable[], level: number) => {            
            let res: IChildable[] = [];
            
            for (let child of children) {
                child.__level = level;
                child.__shift = "";

                for (let i: number = 0; i < level; i++) {
                    child.__shift += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                }

                res.push(child);
                res = res.concat(buildChildren(child.children as IChildable[], level+1));
            }     
            
            return res;
        };

        for (let x of tree) {
            list.push(x);
            list = list.concat(buildChildren(x.children as IChildable[], 1));
        }
        
        return list;
    }    

    protected buildFormData(x: CEntity): FormData {
        const fd = new FormData();
        const data = (window as any).structuredClone(x); // deep copy, to prevent iface reaction for some rebuild :-)

        for (let field in data) {
            if (data[field] instanceof File) {
                fd.append(field, data[field] as unknown as File);
            }
        }

        fd.append("data", JSON.stringify(data));
        return fd;
    }
}
