import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CPaysystem } from 'src/app/model/entities/paysystem';

@Component({
    selector: "the-paysystem",
    templateUrl: "./paysystem.component.html",
})
export class CPaysystemComponent extends CEntityComponent<CPaysystem> {
    // params
    public paramsAdd(): void {
        this.x.params.push({name: "", value: "", loadable: false});
    }    

    public paramsDelete(i: number): void {
        if (confirm(this.thelang.words['common-sure'])) {
            this.x.params.splice(i, 1);            
        }        
    }
}
