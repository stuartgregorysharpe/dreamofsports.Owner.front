export interface ITariff {
    price: number;
    duration: number;
    np_compatible: boolean;
    apple_pid: string;
    google_pid: string;
    active: boolean;
    // relations
    translations: ITariffTranslation[];
}

export interface ITariffTranslation {
    id?: number;
    tariff_id?: number;
    lang_id: number;
    name: string;    
}