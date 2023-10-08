import { CEntity } from "./_entity";
import { CAthlet } from "./athlet";
import { CFirm } from "./firm";
import { CLang } from "./lang";
import { CUserEmail } from "./user.email";
import { CUserImage } from "./user.image";
import { TUserType } from "./user.interface";
import { CUserLink } from "./user.link";
import { CUserOther } from "./user.other";
import { CUserPhone } from "./user.phone";
import { CUserSocial } from "./user.social";
import { CUserVideo } from "./user.video";

export class CUser extends CEntity {
    public lang_id: number;
    public type: TUserType;
    public email: string;
    public password: string;
    public active: boolean;
    public filled: boolean;
    public payed_at: Date;
    public payed_until: Date;
    public created_at: Date;
    // relations
    public athlet: CAthlet;
    public firm: CFirm;
    public phones: CUserPhone[];
    public emails: CUserEmail[];
    public links: CUserLink[];
    public socials: CUserSocial[];
    public images: CUserImage[];
    public videos: CUserVideo[];
    public others: CUserOther[];

    public build (o: Object): CUser {
        for (let field in o) {
            if (["payed_at", "payed_until", "created_at"].includes(field)) {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else if (field === "athlet") {
                this[field] = o[field] ? new CAthlet().build(o[field]) : null;
            } else if (field === "firm") {
                this[field] = o[field] ? new CFirm().build(o[field]) : null;
            } else if (field === "phones") {
                this[field] = o[field] ? o[field].map(c => new CUserPhone().build(c)) : [];
            } else if (field === "emails") {
                this[field] = o[field] ? o[field].map(c => new CUserEmail().build(c)) : [];
            } else if (field === "links") {
                this[field] = o[field] ? o[field].map(c => new CUserLink().build(c)) : [];
            } else if (field === "socials") {
                this[field] = o[field] ? o[field].map(c => new CUserSocial().build(c)) : [];
            } else if (field === "images") {
                this[field] = o[field] ? o[field].map(i => new CUserImage().build(i)) : [];
            } else if (field === "videos") {
                this[field] = o[field] ? o[field].map(v => new CUserVideo().build(v)) : [];
            } else if (field === "others") {
                this[field] = o[field] ? o[field].map(o => new CUserOther().build(o)) : [];
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }  

    public init(ll: CLang[]): CUser {
        this.lang_id = 1;
        this.type = "athlet";
        this.active = true;
        this.filled = false;
        this.payed_at = null;
        this.payed_until = null;
        this.athlet = new CAthlet().init(ll);
        this.firm = new CFirm().init(ll);
        this.phones = [];
        this.emails = [];
        this.links = [];
        this.socials = [];
        this.images = [];
        this.videos = [];
        this.others = [];
        return this;
    }
}
