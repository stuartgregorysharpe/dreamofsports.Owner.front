import { IEntity } from "./_entity.interface";

export interface ILang extends IEntity {
    slug: string;    
    title: string;
    shorttitle: string;
    img: string;    
    slugable: boolean;
    dir: TDir; 
    dateformat: TDateFormat;
    pos: number;
    active: boolean;
}

// [mm/dd/yyyy], [Month dd, yyyy]
// [dd.mm.yyyy], [dd month yyyy]
export type TDateFormat = "en" | "ru";

export type TDir = "ltr" | "rtl";
