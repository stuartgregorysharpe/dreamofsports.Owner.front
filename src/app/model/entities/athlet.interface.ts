import { IEntity } from "./_entity.interface";
import { IReward } from "./reward.interface";

export interface IAthlet extends IEntity {
    user_id: number;
    cat_id: number;
    country_id: number;
    img: string;
    img_s: string;
    birthdate: string;
    gender: TGender;
    height_meter: number;
    height_foot: number;
    weight_kg: number;
    weight_pound: number;
    no: string; 
    // relations
    translations: IAthletTranslation[];
    rewards: IReward[];
}

export interface IAthletTranslation {
    id?: number;
    lang_id: number;
    athlet_id?: number;
    firstname: string;
    lastname: string;
    region: string;
    city: string;
    bio: string;
    team: string; 
    role: string;
}

export type TGender = "m" | "f";
