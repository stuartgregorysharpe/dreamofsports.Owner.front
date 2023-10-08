import { IEntity } from "./_entity.interface";
import { IArticleCat } from "./article.cat.interface";

export interface IArticle extends IEntity {
    cat_id: number;
    slug: string;
    date: string;
    img: string;
    img_s: string;
    active: boolean;
    in_gal: boolean;
    // relations
    translations: IArticleTranslation[];
    cat?: IArticleCat;
}

export interface IArticleTranslation {
    id?: number;
    article_id?: number;
    lang_id: number;
    name: string;
    content: string;
    contentshort: string;
    title: string;
    description: string;
    h1: string;
}
