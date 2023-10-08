import { CEntity } from "./_entity";

export class CFile extends CEntity {
    public mark: string;
    public filename: string;
    public fileurl: string | File;
    public filetype: string;
    public load_to: string;

    public init(): CFile {
        this.load_to = "all";
        return this;
    }
}
