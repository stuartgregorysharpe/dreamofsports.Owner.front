import { IEntity } from "./_entity.interface";

export interface IFile extends IEntity {
    mark: string;
    filename: string;
    fileurl: string;
    filetype: string;
    load_to: string;
}