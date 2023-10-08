export abstract class CEntity {
    public id: number;    
    public defended: boolean;    
    // iface helpers
    public __selected: boolean = false;
    public __level: number = 0;
    public __shift: string = ""; 

    public build (o: Object): any {
        for (let field in o) {
            this[field] = o[field];
        }
        
        return this;
    }

    protected twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    protected randomString(length: number, mode: string = "full"): string {
        let result: string = "";
        let characters: string = "";
        
        if (mode === "full") characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        if (mode === "lowercase") characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        if (mode === "digits") characters = "0123456789";        
        
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return result;
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
