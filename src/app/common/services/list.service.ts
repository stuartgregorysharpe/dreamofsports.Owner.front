export abstract class CListService {
    public sortBy: string = "id";
    public sortDir: number = 1;
    public part: number = 0;    
    public filterActive: boolean = false;
    public filter: any = {};

    public filterChanged?(): boolean {return false;}
    public filterReset?(): void;    
}