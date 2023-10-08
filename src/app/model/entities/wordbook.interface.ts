import { IEntity } from "./_entity.interface";
import { IWord } from "./word.interface";

export interface IWordbook extends IEntity {
    name: string;
    pos: number;
    load_to: string;
    // relations
    words?: IWord[];
}
