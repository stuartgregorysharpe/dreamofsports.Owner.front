import { Component } from '@angular/core';
import { CLang } from 'src/app/model/entities/lang';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-lang",
    templateUrl: "./lang.component.html"
})
export class CLangComponent extends CEntityComponent<CLang> {}
