import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { IThelang } from "src/app/model/entities/thelang";
import { COptions } from "src/app/model/options";
import { IPoint } from "src/app/model/point.interface";

@Injectable()
export class CAppService {
    // data    
    public options: COptions = null;
    public thelang: IThelang = null; 
    public thelangs: IThelang[] = [];   
    // iface    
    public win: HTMLElement = null; 
    public sidebarActive: boolean = true;
    public monitorContent: BehaviorSubject<string> = new BehaviorSubject("");    
    
    constructor(
        private titleService: Title,        
        private router: Router,
    ) {}        

    get url(): string[] {return this.router.url.split("/");}

    public init(thelangs: IThelang[]): void {        
        this.options = new COptions().init(thelangs);
        this.thelangs = thelangs;
        this.thelang = thelangs.find(al => al.slug === this.options.thelangSlug);
    }

    //////////////////////
    // iface
    //////////////////////

    public async monitorLog(s: any, error: boolean = false): Promise<void> {
        const msg = typeof(s) !== "string" ? JSON.stringify(s) : s;  
        const classSt = error ? "class='red'" : "";
        const date = new Date();
        await this.pause(1);
        this.monitorContent.next(this.monitorContent.value + `${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}:${this.twoDigits(date.getSeconds())} <span ${classSt}>${msg}</span><br>`);        
        error && console.log(s);
    }

    //////////////////////
    // strings
    //////////////////////

    public toString(x: any): string {
        const y = String(x);
        return y === "null" || y === "undefined" ? "" : y;
    }

    public twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    public capitalize(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    } 

    public validateEmail(email: string): boolean {
        const re: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email?.toLowerCase());
    }   

    //////////////////////
    // arrays
    //////////////////////

    public range(a: number, b: number): number[] {
        const arr: number[] = [];

        for (let i = a; i <= b; i++) {
            arr.push(i);
        }

        return arr;
    }  

    public sort(arr: any[], by: string = "pos", dir: number = 1): void {
        arr.sort((a: any, b: any) => {
            let x = (typeof(a[by]) === "string") ? (a[by] as string).toLowerCase() : a[by];
            let y = (typeof(b[by]) === "string") ? (b[by] as string).toLowerCase() : b[by];
                            
            if (dir === 1) {
                if (x > y) return 1;
                if (x < y) return -1;                    
                return 0;
            } else if (dir === -1) {
                if (x < y) return 1;
                if (x > y) return -1;
                return 0;
            }

            return 0;
        });
    } 

    public moveArrayElement(arr: any[], from, to) {
        const element = arr.splice(from, 1)[0]; // exclude element
        arr.splice(to, 0, element); // insert element
    }

    //////////////////////
    // randomizing
    //////////////////////

    public rnd(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public rndId(): number {
        return this.rnd(1000000000, 9999999999);
    }

    public randomString(length: number, mode: string = "full"): string {
        let result = "";
        let characters = "";
        
        if (mode === "full") characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        if (mode === "lowercase") characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        if (mode === "digits") characters = "0123456789";        
        
        var charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
    }  

    //////////////////////
    // DOM, CSS
    //////////////////////

    public setTitle (title: string) {        
        this.titleService.setTitle(`${this.thelang.words["common-name"]} - ${title}`);
    }   

    public openWindow(url: string): void {
        const link = document.createElement('a');
        link.href = url;            
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);            
        link.click();   
    }   

    public smoothScroll (from: number, to: number, duration: number, element: HTMLElement): void {		
		const change = to - from;        
		const increment = 10;	
        let currentTime = 0;	
        const animateScroll = () => {        
            currentTime += increment;
            const val = this.easeInOutQuad(currentTime, from, change, duration);
            element.scrollTo(0, val);
            currentTime < duration ? setTimeout(animateScroll, increment) : null;                
        };
        animateScroll();
	}

    private easeInOutQuad (t:number, b:number, c:number, d:number): number {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    // когда нажали на элемент, проверяем всю иерархию DOM на наличие хотя бы одного из указанных class
    public pathHasClasses(elements: HTMLElement[], classNames: string[]): boolean {
        for (let element of elements) {
            for (let className of classNames) {
                if (element.classList?.contains(className)) {
                    return true;
                }
            }            
        }

        return false;
    }    

    // когда нажали на элемент, проверяем всю иерархию DOM на наличие хотя бы одного из указанных id
    public pathHasIds(elements: HTMLElement[], ids: string[]): boolean {
        for (let element of elements) {
            for (let id of ids) {
                if (element.id === id) {
                    return true;
                }
            }            
        }

        return false;
    }

    public cloneStyles(from: HTMLElement, to: HTMLElement): void {
        const styles = window.getComputedStyle(from);
        const cssText = styles.cssText || Array.from(styles).reduce((str, property) => `${str}${property}:${styles.getPropertyValue(property)};`, '');
        to.style.cssText = cssText;
    }

    public contrastColor(index: number): string { // every color will contrast with neighbors
        const hue = index * 137.508 + 240; // golden angle approximation (and +240 to get violet color first)
        const saturation = "50%"; // any that we like
        const lightness = "60%"; // any that we like
        return `hsl(${hue},${saturation},${lightness})`;
    }  

    public isOverlapped(e1: HTMLElement, e2: HTMLElement): boolean {
        const rect1 = e1.getBoundingClientRect();
        const rect2 = e2.getBoundingClientRect();
        
        // one rectangle is on left side of other
        if (rect1.left > rect2.right || rect2.left > rect1.right)
            return false;

        // one rectangle is above other
        if (rect1.bottom < rect2.top || rect2.bottom < rect1.top)
            return false;

        return true;
    }

    public overlapSquare(e1: HTMLElement, e2: HTMLElement): number {
        const rect1 = e1.getBoundingClientRect();
        const rect2 = e2.getBoundingClientRect();
        const xOverlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
        const yOverlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
        return xOverlap * yOverlap;
    }

    public getParents(elem: HTMLElement): HTMLElement[] {
        const parents = [];
        
        while(elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
            elem = elem.parentNode as HTMLElement;
            parents.push(elem);
        }

        return parents;
    }

    //////////////////////
    // dates 
    //////////////////////

    public firstDayOfWeekInMonth(month: number, year: number): number {
        let firstDayOfMonth: number = new Date(year, month, 1).getDay() - 1;

        if (firstDayOfMonth === -1) {
            firstDayOfMonth = 6;
        }

        return firstDayOfMonth;
    }

    public daysInMonth(month: number, year: number): number {
        return 32 - new Date(year, month, 32).getDate()
    }

    public mysqlDate(date: Date): string {
        return `${date.getFullYear()}-${this.twoDigits(date.getMonth()+1)}-${this.twoDigits(date.getDate())}`;
    }

    public formattedDateTime(date: Date): string {
        return date ? `${this.twoDigits(date.getDate())}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()} ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}` : "";
    }

    public formattedDate(date: Date): string {
        return date ? `${this.twoDigits(date.getDate())}.${this.twoDigits(date.getMonth()+1)}.${date.getFullYear()}` : "";
    }

    //////////////////////
    // misc
    //////////////////////

    public pause(ms: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        });
    }     

    public clone(src: any): any {
        return JSON.parse(JSON.stringify(src));
    }

    public isEmpty(v: any): boolean {
        return v === undefined || v === null;
    }

    public polarToCartesian(center: IPoint, radius: number, angleRad: number): IPoint {      
        return {
            x: center.x + (radius * Math.cos(angleRad)),
            y: center.y + (radius * Math.sin(angleRad)),
        };
    }
}