import { IEntity } from "./_entity.interface";
import { IPageWord } from "./page.word";

export interface IPage extends IEntity {
    parent_id: number;
    slug: string;
    img: string;
    pos: number;
    active: boolean;
    menumain: boolean;
    menufoot: boolean;
    // relations
    translations?: IPageTranslation[];
    children?: IPage[];
    words?: IPageWord[];
}

export interface IPageTranslation {
    id?: number;
    page_id?: number;
    lang_id: number;
    name: string;
    content: string;
    title: string;
    description: string;
    h1: string;
}
