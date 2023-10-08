import { IThelang } from "./entities/thelang";

export class COptions {
    public thelangSlug: string;
    public monitorActive: boolean;
    public chunkLength: number;

    public init(thelangs: IThelang[]): COptions {
        const options = JSON.parse(localStorage.getItem("options"));

        if (!options) {
            return this.initDefault(thelangs);            
        }

        this.monitorActive = options.monitorActive || true;
        this.thelangSlug = thelangs.find(al => al.slug === options.thelangSlug) ? options.thelangSlug : thelangs[0].slug;
        this.chunkLength = options.chunkLength || 10;
        return this;
    }

    public save(): void {
        localStorage.setItem("options", JSON.stringify(this));
    }

    private initDefault(thelangs: IThelang[]): COptions {
        this.thelangSlug = thelangs[0].slug;
        this.monitorActive = true;
        this.chunkLength = 10;
        this.save();
        return this;
    }    
}