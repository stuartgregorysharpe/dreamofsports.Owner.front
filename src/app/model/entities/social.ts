import { CEntity } from "./_entity";

export class CSocial extends CEntity {
    public name: string;
    public url: string;
    public img: string;

    public init(): CSocial {
        return this;
    }
}
