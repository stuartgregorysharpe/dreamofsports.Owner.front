import { Component } from '@angular/core';
import { CSlugableEntityComponent } from 'src/app/pages/slugable.entity.component';
import { CCat } from 'src/app/model/entities/cat';

@Component({
    selector: "the-cat",
    templateUrl: "./cat.component.html",
})
export class CCatComponent extends CSlugableEntityComponent<CCat> {}
