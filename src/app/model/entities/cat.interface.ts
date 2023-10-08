export interface ICat {
    parent_id: number;
    slug: string;
    pos: number;
    menufoot: boolean;
    // relations
    translations: ICatTranslation[];
    children?: ICat[];
    parent?: ICat;
}

export interface ICatTranslation {
    id?: number;
    cat_id?: number;
    lang_id: number;
    name: string;
    title: string;
    description: string;
    h1: string;
}
