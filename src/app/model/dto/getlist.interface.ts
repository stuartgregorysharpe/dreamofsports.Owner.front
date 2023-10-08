export interface IGetList {
    sortBy?: string;
    sortDir?: number;
    from?: number;
    q?: number;
    filter?: any; // JSON | string    
    created_at?: Date;    
}
