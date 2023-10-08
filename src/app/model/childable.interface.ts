export interface IChildable {
    children?: IChildable[]; 
    __shift?: string; 
    __level?: number;
}
