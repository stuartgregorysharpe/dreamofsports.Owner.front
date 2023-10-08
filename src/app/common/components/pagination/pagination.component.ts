import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CAppService } from 'src/app/common/services/app.service';
import { IThelang } from 'src/app/model/entities/thelang';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',  
    styleUrls: ['./pagination.component.scss'],
})
export class CPaginationComponent implements OnChanges {
    @Input() n: number = 0;
    @Input() current: number = 0;
    @Output() currentChange: EventEmitter<number> = new EventEmitter ();    

    public parts: number[] = [];
    public changeTo: string | null = null;

    constructor(private appService: CAppService) {}

    get thelang(): IThelang {return this.appService.thelang;}  

    public ngOnChanges(changes: SimpleChanges): void {
        this.initParts();
    }

    private initParts(): void {
        this.parts = [];        
        
        for (let i = 0; i < this.n; i++) {
            if (!i || i == this.n - 1) { // first and last            
                this.parts.push(i);
            } else { // middle            
                if (i - this.current > 1) {
                    this.parts.push(-1);
                } else if (this.current - i > 1) {
                    this.parts.push(-2);
                } else {
                    this.parts.push(i);
                }
            }            
        }

        this.parts = this.parts.filter((v, i, a) => a.indexOf(v) === i); // array_unique
    }    

    public setCurrent (v: number): void {        
        if (v >= 0 && v !== this.current) {            
            this.currentChange.emit(v);                
        }        
    }

    public back(): void {
        if (this.current > 0) {
            this.currentChange.emit(this.current - 1);            
        }
    }

    public forward(): void {
        if (this.current < this.n - 1) {                        
            this.currentChange.emit(this.current + 1);            
        }
    }

    public setCurrentManual(): void {        
        let changeTo = parseInt(this.changeTo);
        this.changeTo = null;

        if (changeTo > 0 && changeTo <= this.n) {            
            this.setCurrent(changeTo - 1);
        }        
    }
}
