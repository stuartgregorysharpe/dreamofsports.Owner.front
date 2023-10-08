import { IModerableImage } from "./moderable.image.interface";

export class CModerableImage {
    public url: string;
    public user_id: number;
    public user_email: string;
    public created_at: Date;

    public build (o: IModerableImage): CModerableImage {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    } 

    protected twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    public formattedDate(field: string, withTime: boolean = false): string {
        const date = this[field] as Date;

        if (date) {
            const time = withTime ? ` ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}` : '';
            return `${this.twoDigits(date.getDate())}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()}${time}`;
        }
        
        return "";
    }
}
