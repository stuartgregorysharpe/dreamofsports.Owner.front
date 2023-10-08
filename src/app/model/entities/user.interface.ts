import { IEntity } from "./_entity.interface";
import { IAthlet } from "./athlet.interface";
import { IFirm } from "./firm.interface";
import { IUserEmail } from "./user.email.interface";
import { IUserImage } from "./user.image.interface";
import { IUserLink } from "./user.link.interface";
import { IUserOther } from "./user.other.interface";
import { IUserPhone } from "./user.phone.interface";
import { IUserSocial } from "./user.social.interface";
import { IUserVideo } from "./user.video.interface";

export interface IUser extends IEntity {
    lang_id: number;
    type: TUserType;
    email: string;
    password: string;
    active: boolean;
    filled: boolean;
    payed_at: string;
    payed_until: string;
    created_at: string;
    // relations
    athlet: IAthlet;
    firm: IFirm;
    phones: IUserPhone[];
    emails: IUserEmail[];
    links: IUserLink[];
    socials: IUserSocial[];
    images: IUserImage[];
    videos: IUserVideo[];
    others: IUserOther[];
}

export type TUserType = "athlet" | "firm";
